import { LightningElement, api, wire, track } from "lwc";
// import getrecord from "@salesforce/apex/customContactForm.getrecord";
// import { loadStyle } from "lightning/platformResourceLoader";
// import customSR from "@salesforce/resourceUrl/customContactform";
import getManagedContentByContentKeys from "@salesforce/apex/fileuploadnetwork.getContent";
import basePath from "@salesforce/community/basePath";
var array;

export default class Zehntechform extends LightningElement {
  @api background;
  @api headingcolor;
  @api subheadingcolor;
  @api fontfamily;
  @api borderradius;
  @api headingfontsize;
  @api headingfontweight;
  @api subheadingfontsize;
  @api subheadingfontweight;

  @track imageUrl;
  @api networkname;
  @api contentId;
  //
  @api firstform;
  @api secondform;
  @api firstname;
  @api lastname;
  @api contact;
  @api emailId;
  @api description;
  @api buttonname;

  @track Form_1;
  @track Form_2;
  fname;
  lname;
  contactUs;
  email;
  message;

  // Second One
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
    // Promise.all([loadStyle(this, customSR)]);
    array = basePath.split("/")[1];

    switch (this.secondform) {
      case "Form_1":
        this.Form_1 = true;
        this.Form_2 = false;
        break;
      case "Form_2":
        this.Form_1 = false;
        this.Form_2 = true;
        break;
      default:
        this.Form_1 = true;
        break;
    }

    console.log("form-1",this.Form_1);
    console.log("for-2",this.Form_2);
  }
}
