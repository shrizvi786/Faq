import { LightningElement, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import customSR from "@salesforce/resourceUrl/customMinifiedDPne";
// import getrecord from 'lightning/uiRecordApi'

//const replacePatternSML = `<span class="salesforceMergeField"><mark>$1</mark></span>`;
export default class Lwc_Faq_Custom extends LightningElement {
  @api allignment;
  @api verticalpadding;
  @api horizontalpadding;
  @api bottompadding;
  @api rightpadding;
  @api label_0;
  @api label_1;
  @api label_2;
  @api label_3;
  @api label_4;
  @api label_5;
  @api label_6;
  @api label_7;
  @api label_8;
  @api label_9;
  @api label_10;
  @api label_11;
  @api label_12;
  @api label_13;
  @api label_14;
  @api label_15;
  @api label_16;
  @api label_17;
  @api label_18;
  @api label_19;
  @api labelanswer_0;
  @api labelanswer_1;
  @api labelanswer_2;
  @api labelanswer_3;
  @api labelanswer_4;
  @api labelanswer_5;
  @api labelanswer_6;
  @api labelanswer_7;
  @api labelanswer_8;
  @api labelanswer_9;
  @api labelanswer_10;
  @api labelanswer_11;
  @api labelanswer_12;
  @api labelanswer_13;
  @api labelanswer_14;
  @api labelanswer_15;
  @api labelanswer_16;
  @api labelanswer_17;
  @api labelanswer_18;
  @api labelanswer_19;
  @api backgroundColor;
  @api color;
  @api backgroundColors;
  @api colors;
  @track selectedColor;
  activeSectionMessage = "";
  @track verticalpaddingnew;
  @track horizontalpaddingnew;
  @track bottompaddingnew;
  @track rightpaddingnew;

  get notempty() {
    return !!this.label_1;
  }
  get notemptyy() {
    return !!this.label_2;
  }
  get notemptyyy() {
    return !!this.label_3;
  }

  get label_4_1() {
    return !!this.label_4;
  }
  get label_5_1() {
    return !!this.label_5;
  }
  get label_6_1() {
    return !!this.label_6;
  }
  get label_7_1() {
    return !!this.label_7;
  }
  get label_8_1() {
    return !!this.label_8;
  }
  get label_9_1() {
    return !!this.label_9;
  }
  get label_10_1() {
    return !!this.label_10;
  }
  get label_11_1() {
    return !!this.label_11;
  }
  get label_12_1() {
    return !!this.label_12;
  }
  get label_13_1() {
    return !!this.label_13;
  }
  get label_14_1() {
    return !!this.label_14;
  }
  get label_15_1() {
    return !!this.label_15;
  }
  get label_16_1() {
    return !!this.label_16;
  }
  get label_17_1() {
    return !!this.label_17;
  }
  get label_18_1() {
    return !!this.label_18;
  }
  get label_19_1() {
    return !!this.label_19;
  }

  get componentStyle() {
    return `background:${this.backgroundColor};color:${this.color};`;
  }
  renderedCallback() {
    Promise.all([loadStyle(this, customSR)]);
    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-allignment", this.allignment);

    switch (this.verticalpadding) {
      case "Top-Small":
        this.verticalpaddingnew = "10px";
        break;
      case "Top-Medium":
        this.verticalpaddingnew = "15px";
        break;
      case "Top-Large":
        this.verticalpaddingnew = "30px";
        break;
      default:
        this.verticalpaddingnew = "0px";
        break;
    }

    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-verticalpadding", this.verticalpaddingnew);

    //  Left Padding Dynamic Css
    switch (this.horizontalpadding) {
      case "Left-Small":
        this.horizontalpaddingnew = "10px";
        break;
      case "Left-Medium":
        this.horizontalpaddingnew = "15px";
        break;
      case "Left-Large":
        this.horizontalpaddingnew = "30px";
        break;
      default:
        this.horizontalpaddingnew = "0px";
        break;
    }

    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-horizontalpadding", this.horizontalpaddingnew);

    //  Bottom Padding Dynamic Css
    switch (this.bottompadding) {
      case "Bottom-Small":
        this.bottompaddingnew = "10px";
        break;
      case "Bottom-Medium":
        this.bottompaddingnew = "15px";
        break;
      case "Bottom-Large":
        this.bottompaddingnew = "30px";
        break;
      default:
        this.bottompaddingnew = "0px";
        break;
    }

    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-bottompadding", this.bottompaddingnew);

    //  right Padding Dynamic Css
    switch (this.rightpadding) {
      case "Right-Small":
        this.rightpaddingnew = "10px";
        break;
      case "Right-Medium":
        this.rightpaddingnew = "15px";
        break;
      case "Right-Large":
        this.rightpaddingnew = "30px";
        break;
      default:
        this.rightpaddingnew = "0px";
        break;
    }

    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-rightpadding", this.rightpaddingnew);

    // Question Css Dynamic
    this.template
      .querySelector('[data-dtd="test"]')
      .classList.add("cssdfynamic");

    // Dynamic question css
    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-question", this.backgroundColors);

    this.template
      .querySelector("lightning-accordion")
      .style.setProperty("--my-questioncontent", this.colors);

    //this.template
    //.querySelector("slds-button slds-button_reset slds-accordion__summary-action")
    //.classList.add("cssdfynamic");
  }

  //   renderedCallback() {
  //     this.initCSSVariables();
  //     /* JFYI, use a flag if you only want to run this logic on first render of the component. */
  //   }

  //   initCSSVariables() {
  //     var css = document.body.style;
  //     css.setProperty("--modalHeight", this.text-align);
  //   }

  handleToggleSection(event) {
    this.activeSectionMessage =
      "Open section name:  " + event.detail.openSections;

    
  }
}
