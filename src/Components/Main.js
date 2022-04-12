import React from "react";
import Mode from "./Mode";
import { MainHeader, ModeContainer } from "./Styled-Components";

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

export default Main;
