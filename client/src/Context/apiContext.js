import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [sliderData, setSliderData] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [creatorData, setCreatorData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [settingsData, setSettingsData] = useState([]);
  const [companyinfoData, setCompanyinfoData] = useState([]);
  const [stripYearList, setStripYearList] = useState([]);
  const [attributeList, setAttributeList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [country, setCountry] = useState([]);

  // GET Slider_Data
  const getSliderData = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/slider_list")
      .then((res) => res.json())
      .then((res) => {
        setSliderData(res.response.sliders);
      });
  };

  // GET Character_Data
  const getCharacterData = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/charactor_list")
      .then((res) => res.json())
      .then((res) => {
        setCharacterData(res.response.charactors);
      });
  };

  // GET Creator_Data
  const getCreatorData = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/creator_list")
      .then((res) => res.json())
      .then((res) => {
        setCreatorData(res.response.creators);
      });
  };

  // GET Events_Data
  const getEventsData = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/event_list")
      .then((res) => res.json())
      .then((res) => {
        setEventsData(res.response.events);
      });
  };

  // GET Settings_Data
  const getSettingData = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/settings")
      .then((res) => res.json())
      .then((res) => {
        setSettingsData(res.response.settings);
      });
  };

  // GET Comapny_Info
  const getCompanyInfo = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/company_info")
      .then((res) => res.json())
      .then((res) => {
        setCompanyinfoData(res.response.company_info);
      });
  };

  // GET Strip Year List
  const getStripYearList = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/stripyear_list")
      .then((res) => res.json())
      .then((res) => {
        setStripYearList(res.response.strip_year);
      });
  };

  // GET Attribute List
  const getAttributeList = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/attribute_list")
      .then((res) => res.json())
      .then((res) => {
        setAttributeList(res.response.attribute_list);
      });
  };

  // GET Price List
  const getPriceList = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/price_range_list")
      .then((res) => res.json())
      .then((res) => {
        setPriceList(res.response.price_range_list);
      });
  };

  // GET Category List
  const getCategoryList = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/category_list")
      .then((res) => res.json())
      .then((res) => {
        setCategoryList(res.response.categories);
      });
  };

  // GET Country List
  const getCountryList = async () => {
    return await fetch("https://applexinfotech.com/chintoo2/admin/api1/country_list")
      .then((res) => res.json())
      .then((res) => {
        setCountry(res.response.countries);
      });
  };

  useEffect(() => {
    getSliderData();
    getCharacterData();
    getCreatorData();
    getEventsData();
    getSettingData();
    getCompanyInfo();
    getStripYearList();
    getAttributeList();
    getPriceList();
    getCategoryList();
    getCountryList();
  }, []);

  return (
    <APIContext.Provider
      value={{
        sliderData,
        characterData,
        creatorData,
        eventsData,
        settingsData,
        companyinfoData,
        stripYearList,
        attributeList,
        priceList,
        categoryList,
        // country, state, city
        country,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
