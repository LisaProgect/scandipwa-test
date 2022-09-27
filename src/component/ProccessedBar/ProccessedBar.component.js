import PropTypes from "prop-types";
import { PureComponent, Fragment } from "react";

import "./ProccessedBar.style";

/** @namespace Component/ProccessedBar/Component */
export class ProccessedBar extends PureComponent {
  static propTypes = {
    checkoutSteps: PropTypes.object.isRequired,
    checkoutStep: PropTypes.string.isRequired,
  };

  state = {
    currentStep: 1,
  };

  componentDidMount() {
    const { checkoutStep, checkoutSteps } = this.props;
    this.setState({ currentStep: checkoutSteps[checkoutStep].number });
  }

  componentDidUpdate(prevProps) {
    const { checkoutStep, checkoutSteps } = this.props;

    if (checkoutStep !== prevProps.checkoutStep) {
      this.setState({ currentStep: checkoutSteps[checkoutStep].number });
    }
  }

  renderIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    );
  }

  renderStagePosition(number) {
    const { currentStep } = this.state;
    const isCheckin = number < currentStep;

    return (
      <div block="ProgressBar" elem="ProgressStage">
        {!!isCheckin ? this.renderIcon() : number}
      </div>
    );
  }

  renderProgressContent(isInfoVisible, number, title, isActive) {
    return (
      isInfoVisible && (
        <div block="ProgressBar" elem="ProgressContent" mods={{ isActive }}>
          {this.renderStagePosition(number)}
          <div block="ProgressBar" elem="Title">
            {title}
          </div>
        </div>
      )
    );
  }

  renderProgressLine(isActive) {
    return (
      <div block="ProgressBar" elem="ProgressLine">
        {isActive && <div block="ProgressBar" elem="ProgressLineActive" />}
      </div>
    );
  }

  renderStage = (keyStep) => {
    const { checkoutSteps } = this.props;

    const { currentStep } = this.state;

    const { number, title, isInfoVisible } = checkoutSteps[keyStep];

    const isActive = currentStep >= number;

    return (
      <Fragment key={keyStep}>
        {this.renderProgressLine(isActive)}
        {this.renderProgressContent(isInfoVisible, number, title, isActive)}
      </Fragment>
    );
  };

  renderStages() {
    const { checkoutSteps } = this.props;

    return Object.keys(checkoutSteps).map(this.renderStage);
  }

  render() {
    return <div block="ProgressBar">{this.renderStages()}</div>;
  }
}

export default ProccessedBar;
