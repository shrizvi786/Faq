import { LightningElement, api } from "lwc";
import getrecord from "@salesforce/apex/customContactForm.getrecord";
import { loadStyle } from "lightning/platformResourceLoader";
import customSR from "@salesforce/resourceUrl/customContactform";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Zehntechform extends LightningElement {
@api overallpadding;
@api heading;
@api subheading;
@api headeradjustment;
@api headerfontadjustment;
@api subheaderfontadjustments;
@api subheaderfontweightadjustments;
@api headerfontweightadjustment;
@api firstname;
@api lastname;
@api contact;
@api emailId;
@api description;
@api buttonname;
fname;
lname;
contactUs;
email;
message;

contactChangeVal(event) {
  if (event.target.name === "fname") {
    this.firstName = event.target.value;
    const evt = new ShowToastEvent({
      title: "Success",
      message: this.message,
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);
    console.log("evt", evt);
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

insertContactAction() {
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
      console.log("firstnmae", result);
    })
    .catch((error) => {
      console.log("firstname", error);
    });
}

renderedCallback() {
  Promise.all([loadStyle(this, customSR)]);
  // Over all Padding
  this.template
    .querySelector("lightning-card")
    .style.setProperty("--my-overallpadding", this.overallpadding);

  // Header
  this.template
    .querySelector("lightning-card")
    .style.setProperty("--my-headeradjustment", this.headeradjustment);

  this.template
    .querySelector("lightning-card")
    .style.setProperty(
      "--my-headerfontadjustment",
      this.headerfontadjustment
    );

  this.template
    .querySelector("lightning-card")
    .style.setProperty(
      "--my-headerfontweightadjustment",
      this.headerfontweightadjustment
    );

  this.template
    .querySelector("lightning-card")
    .style.setProperty(
      "--my-subheaderfontweightadjustment",
      this.subheaderfontweightadjustments
    );
  this.template
    .querySelector("lightning-card")
    .style.setProperty(
      "--my-subheaderfontadjustment",
      this.subheaderfontadjustments
    );
}
}
