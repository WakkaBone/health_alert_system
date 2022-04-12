import React, { useState, useContext, useEffect } from "react";
import DropDownHeader from "./DropDownHeader";
import { ProductModeContext } from "../utils/Contexts";
import { SettingsContext } from "../utils/Contexts";
import styled from "styled-components";

const ToggleBlock = styled.div`
  max-height: ${(props) => (props.basicModeOn ? "0px" : "500px")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const BasicMode = ({ basicModeOn = false, setBasicModeOn = (f) => f }) => {
  const [dailyHealthReportOn, setDailyHealthReportOn] = useState(false);
  const [dailyReportTime, setDailyReportTime] = useState();
  const [dailyReportMinutes, setDailyReportMinutes] = useState(0);
  const productMode = useContext(ProductModeContext).productMode;
  const settingsState = useContext(SettingsContext);
  const { settings, setSettings, changeInSettings } = settingsState;

  useEffect(() => {
    if (settings && settings.basic) {
      setDailyHealthReportOn(settings.basic.daily_report);
      setDailyReportTime(settings.basic.daily_report_time);
      setDailyReportMinutes(settings.basic.daily_report_minutes);
    }
  }, [settings]);

  return (
    <>
      <DropDownHeader
        setBasicModeOn={setBasicModeOn}
        mode={productMode === "basicOnly" ? "basicOnly" : "basic"}
        basicModeOn={basicModeOn}
      />
      <ToggleBlock basicModeOn={basicModeOn}>
        <form
          onChange={(e) => {
            const newValue =
              e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setSettings({
              ...settings,
              basic: { ...settings.basic, [e.target.name]: newValue },
            });
            changeInSettings({
              ...settings,
              basic: { ...settings.basic, [e.target.name]: newValue },
            });
          }}
        >
          <h3>Daily health report</h3>
          <input
            onChange={(e) => {
              setDailyHealthReportOn(e.target.checked);
            }}
            type="checkbox"
            id="daily_report"
            name="daily_report"
            checked={dailyHealthReportOn}
            value={dailyHealthReportOn}
          />{" "}
          <label htmlFor="daily_report_time">
            Send daily health report at:
          </label>{" "}
          <input
            disabled={!dailyHealthReportOn && true}
            name="daily_report_time"
            id="daily_report_time"
            type="time"
            value={dailyReportTime}
          />
          <h3>Monitor service</h3>
          <label htmlFor="daily_report_minutes">
            Wait{" "}
            <input
              type="number"
              id="daily_report_minutes"
              name="daily_report_minutes"
              min="0"
              max="60"
              value={dailyReportMinutes}
              disabled={!dailyHealthReportOn}
            />{" "}
            minutes before sending repetititve mail alerts.
          </label>
        </form>
      </ToggleBlock>
    </>
  );
};

export default BasicMode;
