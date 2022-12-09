import { LightningElement, api, wire, track } from "lwc";
import getManagedContentByContentKeys from "@salesforce/apex/fileuploadimageejection.getContent";
import basePath from "@salesforce/community/basePath";
var array;

export default class ImageEjection extends LightningElement {
    @api networkname;
    @api contentId;
    @api showButton = false;
    //@api componentStyle = false;
    @track shanData;
    @track shanError;
    @api communityId;
    @api communitykey;
    @api height;
    @api width;
    @track imageUrl;
    @api filter;
    @api filterhover;
    @track filterhovernew;
    @track filternew;
  
    @api grayScale;
  
    get componentStyle() {
      return `height:${this.height}px;width:${this.width}px`;
    }
    handleClick = () => {
      console.log("You clicked me!");
      console.log("contentId", this.contentkey);
    };
    // CSS Dynamic
    @wire(getManagedContentByContentKeys, {
      contentId: "$contentId",
      page: 0,
      pageSize: 1,
      language: "en_US",
      filterby: "",
      networkName: array
    })
    managedContent({ error, data }) {
      console.log("it entered the function:");
      if (data) {
        console.log("dataaa", data);
        if (data.source) {
          console.log("data", data.source);
          this.imageUrl = basePath + "/sfsites/c" + data.source.url;
        }
      } else if (error) {
        console.log("error:", error);
        // Handle the error.
        this.shanError = error;
      }
    }
    renderedCallback() {
      array = basePath.split("/")[1];
      console.log("Array:", array);
      console.log("Basepath", basePath);
      //console.log("URL index [1]", networkName[1]);
      console.log("Network", this.networkName);
      console.log("contentId", this.contentId);
  
      // this.template.querySelector("img").style.setProperty("--my-filter", this.filter);
  
      // switch (this.filter){
      //   case "gray":
      //     this.filternew = "grayscale(1)";
      //     break;
      //   default:
      //     this.filternew ="none";
      //     break;
      // }
  
      // this.template
      // .querySelector("img")
      // .style.setProperty("--my-filterhover", this.filterhover);
  
      // switch (this.filterhover){
      //   case "none":
      //     this.filternew = "none";
      //     break;
      //   default:
      //     this.filternew ="grayscale()";
      //     break;
      // }
  
      if (this.filter === "gray") {
        this.template.querySelector(".imgFilter").classList.add("imgColor");
      } else if (this.filter === "normal") {
        this.template.querySelector(".imgFilter").classList.remove("imgColor");
        this.template.querySelector(".imgFilter").classList.add("imgColor1");
      } else if (this.filter === "none") {
        this.template.querySelector(".imgFilter").classList.remove("imgColor");
        this.template.querySelector(".imgFilter").classList.remove("imgColor1");
        this.template.querySelector(".imgFilter").classList.add("imgColor2");
      } else if (this.filter === "greyWithoutHover") {
        this.template.querySelector(".imgFilter").classList.remove("imgColor");
        this.template.querySelector(".imgFilter").classList.remove("imgColor1");
        this.template.querySelector(".imgFilter").classList.remove("imgColor2");
        this.template.querySelector(".imgFilter").classList.add("imgColor3");
      }
  
      this.template.host.style.setProperty("--my-grayScale", this.grayScale);
    }
  
    // handleClick = () => {
    //       console.log("You clicked me!")
    //       console.log('contentId', this.contentId)
    //    }
  
    // @wire(getManagedContentByContentKeys, { communityId: Id, managedContentIds: this.contentId, pageParam: 0, pageSize: 1, language: 'en_US', managedContentType: 'news', showAbsoluteUrl: false })
    // managedContent({ error, data }) {
    //   if (data) {
    //     console.log('data:');
    //     console.log({data});
    //     data-contentkey;
  
    //     // Assign data to a variable which you can use in your HTML.
  
    //   } else if (error) {
  
    //    // Handle the error.
    //   }
    //}
}