import React, { useState } from "react";
import AdvancedMode from "./AdvancedMode";
import BasicMode from "./BasicMode";

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

export default Mode;
