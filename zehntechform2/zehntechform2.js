import { LightningElement, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import customSR from "@salesforce/resourceUrl/customcontactformsecond";
// import getManagedContentByContentKeys from "@salesforce/apex/fileuploadnetwork.getContent";
// import basePath from "@salesforce/community/basePath";
// var array
export default class Zehntechform2 extends LightningElement {
  @api imageurl;

  // loader
  @track isLoading = false;

//   handleClick = () => {
//     console.log("You clicked me!");
//     console.log("contentId", this.contentkey);
//   };
//   // CSS Dynamic
//   @wire(getManagedContentByContentKeys, {
//     contentId: "$contentId",
//     page: 0,
//     pageSize: 1,
//     language: "en_US",
//     filterby: "",
//     networkName: array
//   })
//   managedContent({ error, data }) {
//     console.log("it entered the function:");
//     console.log("Network", this.networkName);
//     console.log("contentId", this.contentId);
//     if (data) {
//       if (data.source) {
//         console.log("data", data.source);
//         this.imageUrl = basePath + "/sfsites/c" + data.source.url;
//       }
//     } else if (error) {
//       console.log("error:", error);
//       // Handle the error.
//       this.shanError = error;
//     }
//   }


  renderedCallback(){
    Promise.all([loadStyle(this, customSR)]);
    // array = basePath.split("/")[1];
  }

  handleSuccess(event) {
    console.log("onsuccess event recordEditForm", event.detail.id);
  }
  handleSubmit(event) {
    console.log("onsubmit event recordEditForm" , event.detail.fields);
    this.isLoading = true;
    if(!event.detail.fields === null ) {
      this.isLoading = false ;
      this.showToast();
      console.log("event",event.detail.fields)
    }else {
      this.isLoading = false ;
      this.template
      .querySelector("c-custom-toast")
      .showToast("error", "There is something Error.");
    }

  }
  showToast() {
    this.template
      .querySelector("c-custom-toast")
      .showToast("success", this.message);
  }
}
