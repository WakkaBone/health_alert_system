import React from "react";
import {
  FooterContainer,
  ButtonSave,
  ButtonDiscard,
  ErrorMessage,
  SuccessMessage,
} from "./Styled-Components";
import PropTypes from "prop-types";

const Footer = ({
  applyNewSettings = (f) => f,
  discardNewSettings = (f) => f,
  changeInSettings = (f) => f,
  settings = {},
  errorMessage = "",
  successMessage = "",
}) => {
  return (
    <FooterContainer>
      <hr />
      <div>
        <ButtonSave
          onClick={applyNewSettings}
          disabled={changeInSettings(settings) ? false : true}
        >
          Save
        </ButtonSave>
        <ButtonDiscard
          onClick={discardNewSettings}
          disabled={changeInSettings(settings) ? false : true}
        >
          Discard
        </ButtonDiscard>
      </div>
      <ErrorMessage>{errorMessage && errorMessage}</ErrorMessage>
      <SuccessMessage>{successMessage && successMessage}</SuccessMessage>
    </FooterContainer>
  );
};

Footer.propTypes = {
  applyNewSettings: PropTypes.func,
  discardNewSettings: PropTypes.func,
  changeInSettings: PropTypes.func,
  settings: PropTypes.shape({
    basic: PropTypes.shape({
      daily_report: PropTypes.bool,
      daily_report_minutes: PropTypes.string,
      daily_report_time: PropTypes.string,
    }),
    advanced: PropTypes.shape({
      disk_space: PropTypes.bool,
      disk_space_gb_value: PropTypes.string,
      disk_space_percent_value: PropTypes.string,
      disk_space_time: PropTypes.string,
      disk_space_week: PropTypes.string,
      gb_or_percent: PropTypes.oneOf(["gb", "percent"]),
    }),
  }),
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

export default Footer;
