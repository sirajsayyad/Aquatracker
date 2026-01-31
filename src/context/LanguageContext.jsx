import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, languageNames } from "../i18n/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, default to 'en'
    const saved = localStorage.getItem("aquatracker_language");
    return saved || "en";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("aquatracker_language", language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const availableLanguages = Object.keys(translations).map((code) => ({
    code,
    name: languageNames[code] || code,
  }));

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        availableLanguages,
        languageNames,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
