import { LightningElement, api, track, wire } from "lwc";
import getManagedContentByContentKeys from "@salesforce/apex/fileuploadnetwork_3.getContent";
import doLogin from "@salesforce/apex/CommunityAuthController.doLogin";
// import forwardToAuthPage from "@salesforce/apex/CommunitiesLoginController.forwardToAuthPage";
import basePath from "@salesforce/community/basePath";
import {loadStyle} from 'lightning/platformResourceLoader';
import 	bstrap from '@salesforce/resourceUrl/loginFormbstrap';
var array;
// var emailRegex;

export default class Loginform extends LightningElement {
  @api networkname;
  @api contentId;
  @track imageUrl;
  @api borderradius;
  @api backgroundcolor;
  @api signup;
  @api forgot;

  username
  password;

  // Image Ejejction Part
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

  connectedCallback() {
    var meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1.0");
    // document.getElementsByTagName('head')[0].appendChild(meta);
  }

  renderedCallback() {
    array = basePath.split("/")[1];
    // console.log("Array:", array);
    // console.log("Basepath", basePath);
    //console.log("URL index [1]", networkName[1]);
    // console.log("Network", this.networkName);
    // console.log("contentId", this.contentId);

    Promise.all([
      loadStyle(this, bstrap),

  ])

    this.template
      .querySelector("div")
      .style.setProperty("--my-radius", this.borderradius);

    this.template
      .querySelector("lightning-layout")
      .style.setProperty("--my-containercolor", this.backgroundcolor);
  }

  // Value Target
  handleUserNameChange(event) {
    this.username = event.target.value;
    console.log("username",this.username);
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
    console.log("password",this.password);
  }

  // Regex
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  handleLogin(event) {
    let frstname = this.template.querySelector(".aaa");
    let lstname = this.template.querySelector(".bbb");

    let searchfrst = frstname.value;
    let searchlst = lstname.value;
    if (this.emailRegex.test(searchfrst)) {
      frstname.setCustomValidity("");
    } else {
      frstname.setCustomValidity("Please Check Email Format");
    }
    frstname.reportValidity();

    if (searchlst) {
      lstname.setCustomValidity("");
    } else {
      lstname.setCustomValidity("Password is required");
    }
    lstname.reportValidity();

    console.log("frt", frstname);

    // checking condition

    if (this.username && this.password) {
      event.preventDefault();

      doLogin({ username: this.username, password: this.password })
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
