import { LightningElement, api, wire, track } from "lwc";
import getManagedContentByContentKeys from "@salesforce/apex/ManagedContentCtrlr.getContent";
import basePath from "@salesforce/community/basePath";
export default class FileUpload_testing_0410 extends LightningElement {
  //   @api bntLabel;
  @api contentId;
  @api showButton = false;
  @api componentStyle = false;
  @track shanData;
  @track shanError;
  @api communityId;
  @api communitykey;
  @track imageUrl;

  // Image setting
  //    get componentStyle() {
  //     return `contentId:${this.contentId};`;
  // }

  handleClick = () => {
    console.log("You clicked me!");
    console.log("contentId", this.contentkey);
  };

  @wire(getManagedContentByContentKeys, {
    contentId: "$contentId",
    page: 0,
    pageSize: 1,
    language: "en_US",
    filterby: ""
  })
  managedContent({ error, data }) {
    console.log("it entered the function:");
    if (data) {
      if (data.source) {
        this.imageUrl =
          basePath + "/sfsites/c" + data.source.unauthenticatedUrl;
      }
    } else if (error) {
      console.log("error:", error);
      // Handle the error.
      this.shanError = error;
    }
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
