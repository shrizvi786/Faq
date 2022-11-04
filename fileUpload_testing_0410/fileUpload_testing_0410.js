import { LightningElement, api, wire, track } from "lwc";
import getManagedContentByContentKeys from "@salesforce/apex/ManagedContentCtrlr.getContent";
import basePath from "@salesforce/community/basePath";
var array;
export default class FileUpload_testing_0410 extends LightningElement {
  //   @api bntLabel;
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
    networkName: array ,
  })
  managedContent({ error, data }) {
    console.log("it entered the function:");
    console.log("Network", this.networkName);
    console.log("contentId", this.contentId);
    if (data) {
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
