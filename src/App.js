import "./App.css";
import React, { useState, useEffect } from "react";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { AppContainer, Loader } from "./Components/Styled-Components";
import { ProductModeContext, SettingsContext } from "./utils/Contexts";

const App = () => {
  const [oldSettings, setOldSettings] = useState(
    JSON.parse(localStorage.getItem("settings"))
  );
  const [productMode, setProductMode] = useState("");
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings"))
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const changeInSettings = (settings = { basic: {}, advanced: {} }) => {
    if (!oldSettings) {
      localStorage.setItem(
        "settings",
        JSON.stringify({ basic: {}, advanced: {} })
      );
      return false;
    }
    if (
      oldSettings &&
      JSON.stringify(oldSettings) !== JSON.stringify(settings)
    ) {
      localStorage.setItem("settings", JSON.stringify(settings));
      return true;
    }
    if (JSON.stringify(oldSettings) === JSON.stringify(settings)) {
      return false;
    }
  };

  const validate = () => {
    if (settings.basic.daily_report) {
      if (!settings.basic.daily_report_minutes) {
        return "Please specify how many minutes to wait before sending another mail alert";
      }
      if (!settings.basic.daily_report_time) {
        return "Please specify when to send the daily health report";
      }
    }
    if (settings.advanced.disk_space) {
      if (!settings.advanced.gb_or_percent) {
        return "Please specify whether you want to use GB or % mode";
      }
      if (!settings.advanced.disk_space_week) {
        return "Please specify the day of the week on which you would like to receive weekly alerts";
      }
      if (!settings.advanced.disk_space_time) {
        return "Please specify the time on which you would like to receive weekly alerts";
      }
      if (
        (settings.advanced.gb_or_percent === "gb" &&
          !settings.advanced.disk_space_gb_value) ||
        (settings.advanced.gb_or_percent === "percent" &&
          !settings.advanced.disk_space_percent_value)
      ) {
        return "Please specify threshold to receive weekly alerts";
      }
    }
    return false;
  };

  const applyNewSettings = () => {
    const validationResult = validate();
    if (validationResult) {
      setErrorMessage(validationResult);
    } else {
      setErrorMessage("");
      setSuccessMessage("Settings have been updated");
    }
  };

  const discardNewSettings = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setSettings(oldSettings);
    localStorage.setItem("settings", JSON.stringify(oldSettings));
  };

  useEffect(() => {
    //SEND REQUEST TO SERVER TO GET THE PRODUCT MODE
    const productModeResponse = process.env.REACT_APP_PRODUCT_MODE;
    setProductMode(productModeResponse); //change to 'basicOnly' to see the difference
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("settings")) {
      localStorage.setItem(
        "settings",
        JSON.stringify({ basic: {}, advanced: {} })
      );
    } else {
      setOldSettings(JSON.parse(localStorage.getItem("settings")));
      setSettings(JSON.parse(localStorage.getItem("settings")));
    }
  }, []);

  return (
    <ProductModeContext.Provider value={{ productMode }}>
      <SettingsContext.Provider
        value={{ settings, setSettings, changeInSettings }}
      >
        <AppContainer>
          {!productMode ? (
            <Loader />
          ) : (
            <>
              <Main productMode={productMode} />
              <Footer
                applyNewSettings={applyNewSettings}
                discardNewSettings={discardNewSettings}
                changeInSettings={changeInSettings}
                settings={settings}
                errorMessage={errorMessage}
                successMessage={successMessage}
              />
            </>
          )}
        </AppContainer>
      </SettingsContext.Provider>
    </ProductModeContext.Provider>
  );
};

export default App;
