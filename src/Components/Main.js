import React from "react";
import Mode from "./Mode";
import { MainHeader, ModeContainer } from "./Styled-Components";
import PropTypes from "prop-types";

const Main = ({ productMode = "" }) => {
  return (
    <div>
      <MainHeader>Health alerts</MainHeader>
      <ModeContainer>
        <Mode mode="basic" />
      </ModeContainer>
      {productMode === "advanced" ? (
        <ModeContainer>
          <Mode mode="advanced" />
        </ModeContainer>
      ) : null}
    </div>
  );
};

Main.propTypes = { productMode: PropTypes.oneOf(["advanced", "basicOnly"]) };

export default Main;
