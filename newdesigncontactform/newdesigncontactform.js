import { LightningElement, api, track } from "lwc";
/// jquery import
import jQuery from "@salesforce/resourceUrl/jQuery";
import { loadScript } from "lightning/platformResourceLoader";
// Apex Class Import
import getrecord from "@salesforce/apex/customContactForm.getrecord";
// bootstrap import
import { loadStyle } from "lightning/platformResourceLoader";
import customSR from "@salesforce/resourceUrl/customContactform";
import bstrap from "@salesforce/resourceUrl/contactFormbstrap";

var emailRegex;
var phoneno;

export default class Newdesigncontactform extends LightningElement {
  // design
  @api background;
  @api headingcolor;
  @api subheadingcolor;
  @api fontfamily;
  @api borderradius;
  @api headingfontsize;
  @api headingfontweight;
  @api subheadingfontsize;
  @api subheadingfontweight;

  // insert Data
  @api firstname;
  @api lastname;
  @api contact;
  @api emailid;
  @api description;
  @api buttonname;
  @api enteremail;
  @track message;

  // Loader
  @track isLoading = false;

  contactChangeVal(event) {
    if (event.target.name === "fname") {
      this.firstName = event.target.value;
      // if(this.firstName != null){
      //   this.template
      //   .querySelector("c-custom-toast")
      //   .showToast("error", "There is something Error.");
      // }
    }
    if (event.target.name === "lname") {
      this.lastName = event.target.value;
    }
    if (event.target.name === "contactUs") {
      this.Contact = event.target.value;
    }
    if (event.target.name === "email") {
      this.email = event.target.value;
    }
    if (event.target.name === "message") {
      this.Description = event.target.value;
    }
  }

  phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  insertContactAction() {
    this.isLoading = true;
    // let frstname = this.template.querySelector(".frstname");
    let lstname = this.template.querySelector(".lstname");
    let cnt = this.template.querySelector(".cnt");
    let eml = this.template.querySelector(".eml");
    // let searchfrst = frstname.value;
    let searchlst = lstname.value;
    let searchcnt = cnt.value;
    let searcheml = eml.value;

    // if (!searchfrst) {
    //   frstname.setCustomValidity(" First Name is required");
    // } else {
    //   frstname.setCustomValidity("");
    // }
    // frstname.reportValidity();

    if (!searchlst) {
      lstname.setCustomValidity("Last Name is required");
    } else {
      lstname.setCustomValidity("");
    }
    lstname.reportValidity();

    if (this.phoneno.test(searchcnt)) {
      cnt.setCustomValidity("");
    } else {
      cnt.setCustomValidity("Contact is required");
    }
    cnt.reportValidity();
    if (this.emailRegex.test(searcheml)) {
      eml.setCustomValidity("");
    } else {
      eml.setCustomValidity("Please Enter Valid Email Address");
    }
    eml.reportValidity();

    console.log("returnfirstName ", this.firstName);
    console.log("returnContact ", this.Contact);
    console.log("returnlastname ", this.lastName);
    console.log("returnemailID ", this.email);
    console.log("returndescription ", this.Description);
    getrecord({
      Name: this.firstName,
      contact: this.Contact,
      lastname: this.lastName,
      email: this.email,
      description: this.Description
    })
      .then((result) => {
        this.message = result;
        if (
          result === "" ||
          (result === null && this.emailRegex.test(searcheml))
        ) {
          this.template
            .querySelector("c-custom-toast")
            .showToast("error", "Please fill all the fields.");
          // this.isLoading = false;
        } else {
          // this.isLoading = false;
          this.showToast();
          this.updateRecordView();
          // this.closeQuickAction();
          // frstname.value = "";
          // lstname.value = "";
          // cnt.value ="";
          // eml.value="";
        }
        console.log("firstnmae", result);
        console.log("updateRecordView", this.updateRecordView());
      })
      .catch((error) => {
        console.log("firstname", error);
        this.isLoading = false;
        this.template
          .querySelector("c-custom-toast")
          .showToast("error", "There is something Error.");
      })
      .finally(() => {
        this.isLoading = false;
      });

    // this.isLoading = true;
    // lstname.value = '';

    //   let email=this.template.querySelector(".eml");
    //   let emailVal=eml.value;
    //   if(emailVal.match(emailRegex)){
    //     email.setCustomValidity("");

    // }else{
    //     email.setCustomValidity("Please enter valid email");
    // }
    // email.reportValidity();
  }

  showToast() {
    this.template
      .querySelector("c-custom-toast")
      .showToast("success", this.message);
  }
  updateRecordView() {
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      1000
    );
    //     setTimeout(() => {
    //       eval("$A.get('e.force:refreshView').fire();");
    //  }, 1000);

    // setTimeout(function () { (eval("$A.get('e.force:refreshView').fire()")) }, 4000);
  }

  renderedCallback() {
    // JQuery Loaded
    loadScript(this, jQuery)
      .then(() => {
        console.log(" loaded .");
      })
      .catch((error) => {
        console.log("failed", error);
      });

    Promise.all([loadStyle(this, customSR)]);
    Promise.all([loadStyle(this, bstrap)]);
    this.template
      .querySelector("div")
      .style.setProperty("--my-backgroundcolor", this.background);

    this.template
      .querySelector("div")
      .style.setProperty("--my-headingcolor", this.headingcolor);

    this.template
      .querySelector("div")
      .style.setProperty("--my-subheadingcolor", this.subheadingcolor);

    this.template
      .querySelector("div")
      .style.setProperty("--my-fontfamily", this.fontfamily);

    this.template
      .querySelector("div")
      .style.setProperty("--my-borderradius", this.borderradius);

    this.template
      .querySelector("div")
      .style.setProperty("--my-headingfontsize", this.headingfontsize);

    this.template
      .querySelector("div")
      .style.setProperty("--my-headingfontweight", this.headingfontweight);

    this.template
      .querySelector("div")
      .style.setProperty("--my-subheadingfontsize", this.subheadingfontsize);

    this.template
      .querySelector("div")
      .style.setProperty(
        "--my-subheadingfontweight",
        this.subheadingfontweight
      );
  }
}
