import React from "react";
import { useTranslation } from "react-i18next";

interface TranslationProviderProps {
  children: React.ReactNode;
}

const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation();


  React.useEffect(() => {
    (window as any).t = t;
    (window as any).currentLang = i18n.language;
  }, [t, i18n.language]);

  return <>{children}</>;
};

export default TranslationProvider;