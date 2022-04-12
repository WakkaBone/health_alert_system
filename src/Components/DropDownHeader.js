import React from "react";
import { ModeHeader } from "../Components/Styled-Components/index";

const DropDownHeader = ({
  mode = "",
  basicModeOn = false,
  setBasicModeOn = (f) => f,
  advancedModeOn = false,
  setAdvancedModeOn = (f) => f,
}) => {
  const toggleModeDetails = () => {
    mode === "basic" || mode === "basicOnly"
      ? setBasicModeOn(!basicModeOn)
      : setAdvancedModeOn(!advancedModeOn);
  };
  return (
    <ModeHeader
      mode={mode}
      basicModeOn={basicModeOn}
      advancedModeOn={advancedModeOn}
      onClick={toggleModeDetails}
    >
      {mode === "advanced"
        ? "Advanced"
        : mode === "basic"
        ? "Basic"
        : "Alert types"}
    </ModeHeader>
  );
};

export default DropDownHeader;
