import ContentWrapper from "Component/ContentWrapper";
import ProccessedBar from 'Component/ProccessedBar';
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import {
  DETAILS_STEP,
  SHIPPING_STEP,
  BILLING_STEP,
} from "SourceRoute/Checkout/Checkout.config";

/** @namespace Route/Checkout/Component */
export class CheckoutComponent extends SourceCheckout {
  checkoutSteps = {
    [SHIPPING_STEP]: {
      number: 1,
      title: "Shipping",
      isInfoVisible: true,
    },
    [BILLING_STEP]: {
      number: 2,
      title: "Review & Payments",
      isInfoVisible: true,
    },
    [DETAILS_STEP]: {
      number: 3,
      isInfoVisible: false,
    },
  };

  render() {
    const { checkoutStep } = this.props;
    
    return (
      <main block="Checkout">
       <ProccessedBar checkoutStep={checkoutStep} checkoutSteps={this.checkoutSteps}/>
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default CheckoutComponent;
