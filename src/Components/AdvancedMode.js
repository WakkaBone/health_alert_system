import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../utils/Contexts";
import DropDownHeader from "./DropDownHeader";
import styled from "styled-components";
import { IndentedDiv } from "./Styled-Components";
import PropTypes from "prop-types";

const ToggleBlock = styled.div`
  max-height: ${(props) => (props.advancedModeOn ? "0px" : "500px")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AdvancedMode = ({
  advancedModeOn = false,
  setAdvancedModeOn = (f) => f,
}) => {
  const [weeklyAlertsOn, setWeeklyAlertsOn] = useState(false);
  const [gbOn, setGbOn] = useState(false);
  const [percentOn, setPercentOn] = useState(false);
  const [diskSpaceTime, setDiskSpaceTime] = useState();
  const [diskSpaceWeek, setDiskSpaceWeek] = useState();
  const [diskSpaceGbValue, setDiskSpaceGbValue] = useState();
  const [diskSpacePercentValue, setDiskSpacePercentValue] = useState();
  const settingsState = useContext(SettingsContext);
  const { settings, setSettings, changeInSettings } = settingsState;
  const [gbOrPercent, setGbOrPercent] = useState("");

  useEffect(() => {
    if (settings && settings.advanced) {
      setWeeklyAlertsOn(settings.advanced.disk_space);
      setDiskSpaceTime(settings.advanced.disk_space_time);
      setDiskSpaceWeek(settings.advanced.disk_space_week);
      setGbOrPercent(settings.advanced.gb_or_percent);
      if (gbOrPercent === "gb") {
        setDiskSpaceGbValue(settings.advanced.disk_space_gb_value);
        setDiskSpacePercentValue(null);
      }
      if (gbOrPercent === "percent") {
        setDiskSpacePercentValue(settings.advanced.disk_space_percent_value);
        setDiskSpaceGbValue(null);
      }
    }
  }, [settings, gbOrPercent]);

  return (
    <>
      <DropDownHeader
        mode="advanced"
        advancedModeOn={advancedModeOn}
        setAdvancedModeOn={setAdvancedModeOn}
      />
      <ToggleBlock advancedModeOn={advancedModeOn}>
        <form
          onChange={(e) => {
            const newValue =
              e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setSettings({
              ...settings,
              advanced: { ...settings.advanced, [e.target.name]: newValue },
            });
            changeInSettings({
              ...settings,
              advanced: { ...settings.advanced, [e.target.name]: newValue },
            });
          }}
        >
          <h3>Server data disk space</h3>
          <input
            type="checkbox"
            name="disk_space"
            checked={weeklyAlertsOn}
            value={weeklyAlertsOn}
            onChange={(e) => setWeeklyAlertsOn(e.target.checked)}
          />{" "}
          Send weekly disk space alert at{" "}
          <select disabled={!weeklyAlertsOn} name="disk_space_week">
            {daysOfWeek.map((day, index) => (
              <option key={index} value={day.toLowerCase()}>
                {day}
              </option>
            ))}
          </select>
          <input
            disabled={!weeklyAlertsOn}
            type="time"
            name="disk_space_time"
            value={diskSpaceTime}
          />{" "}
          when disk space has dropped below:
          <IndentedDiv>
            <input
              onChange={(e) => {
                setGbOrPercent(e.target.value);
                setGbOn(e.target.checked);
                if (percentOn) {
                  setPercentOn(!e.target.checked);
                }
              }}
              type="radio"
              disabled={!weeklyAlertsOn}
              checked={weeklyAlertsOn && gbOrPercent === "gb" ? true : false}
              name="gb_or_percent"
              value="gb"
            />{" "}
            <input
              disabled={
                (!weeklyAlertsOn && gbOrPercent !== "gb") ||
                (weeklyAlertsOn && gbOrPercent !== "gb") ||
                !gbOrPercent ||
                !weeklyAlertsOn
              }
              type="number"
              max="999"
              min="0"
              value={diskSpaceGbValue}
              id="disk_space_gb_value"
              name="disk_space_gb_value"
            />{" "}
            <label htmlFor="disk_space_gb_value">GB</label>
          </IndentedDiv>
          <IndentedDiv>
            <input
              onChange={(e) => {
                setGbOrPercent(e.target.value);
                setPercentOn(e.target.checked);
                if (gbOn) {
                  setGbOn(e.target.checked);
                }
              }}
              type="radio"
              disabled={!weeklyAlertsOn}
              checked={
                weeklyAlertsOn && gbOrPercent === "percent" ? true : false
              }
              name="gb_or_percent"
              value="percent"
            />{" "}
            <input
              type="number"
              max="100"
              min="0"
              disabled={
                (!weeklyAlertsOn && gbOrPercent !== "percent") ||
                (weeklyAlertsOn && gbOrPercent !== "percent") ||
                !gbOrPercent ||
                !weeklyAlertsOn
              }
              name="disk_space_percent_value"
              id="disk_space_percent_value"
              value={diskSpacePercentValue}
            />{" "}
            <label htmlFor="disk_space_percent_value">%</label>
          </IndentedDiv>
        </form>
      </ToggleBlock>
    </>
  );
};

AdvancedMode.propTypes = {
  advancedModeOn: PropTypes.bool,
  setAdvancedModeOn: PropTypes.func,
};

export default AdvancedMode;
