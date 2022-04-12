import React from "react";
import {
  FooterContainer,
  ButtonSave,
  ButtonDiscard,
  ErrorMessage,
  SuccessMessage,
} from "./Styled-Components";

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

export default Footer;
