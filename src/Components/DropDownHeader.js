import React from "react";
import { ModeHeader } from "../Components/Styled-Components/index";
import PropTypes from "prop-types";

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

DropDownHeader.propTypes = {
  mode: PropTypes.string,
  basicModeOn: PropTypes.bool,
  setBasicModeOn: PropTypes.func,
  advancedModeOn: PropTypes.bool,
  setAdvancedModeOn: PropTypes.func,
};

export default DropDownHeader;
