import { LightningElement, api, wire, track } from "lwc";
import getManagedContentByContentKeys from "@salesforce/apex/fileuploadnetwork_5.getContent";
import basePath from "@salesforce/community/basePath";
import forgotPassword from "@salesforce/apex/LightningForgotPasswordControllercCustom.forgotPassword"
import {loadStyle} from 'lightning/platformResourceLoader';
import 	bstrap from '@salesforce/resourceUrl/bstrap';
var array;
export default class ForgotPassword extends LightningElement {
  @api networkname;
  @api contentId;
  @track imageUrl;
  @api email;
  @api maincontainer;
  @api headingcolor;
  @api bodycolor;
   username;
   checkEmailUrl;

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
    array = basePath.split("/")[1];
    Promise.all([
      loadStyle(this, bstrap),


      this.template
      .querySelector("div")
      .style.setProperty("--my-maincontainer", this.maincontainer),

      this.template
      .querySelector("div")
      .style.setProperty("--my-heading", this.headingcolor),

      this.template
      .querySelector("div")
      .style.setProperty("--my-body", this.bodycolor),

  ])
  }

  handleUserNameChange(event) {
    this.username = event.target.value;
    console.log("username",this.username);
  }

  handlelogin(event){
    if (this.username) {
        event.preventDefault();
  
        forgotPassword({ username: this.username , checkEmailUrl: this.email})
          .then((result) => {
            window.location.href = result;
            console.log("resultssssss", result);
          })
          .catch((error) => {
            this.error = error;
            this.errorCheck = true;
            this.errorMessage = error.body.message;
            console.log("errorsssss", error);
          });
      }
  }
}
