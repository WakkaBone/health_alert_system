import React, { useState } from "react";
import AdvancedMode from "./AdvancedMode";
import BasicMode from "./BasicMode";
import PropTypes from "prop-types";

const Mode = ({ mode = "" }) => {
  const [basicModeOn, setBasicModeOn] = useState();
  const [advancedModeOn, setAdvancedModeOn] = useState();

  if (mode === "advanced")
    return (
      <AdvancedMode
        advancedModeOn={advancedModeOn}
        setAdvancedModeOn={setAdvancedModeOn}
      />
    );
  if (mode === "basic")
    return (
      <BasicMode basicModeOn={basicModeOn} setBasicModeOn={setBasicModeOn} />
    );
};

Mode.propTypes = { mode: PropTypes.oneOf(["basic", "advanced"]) };

export default Mode;
