// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          selectMachines: "Select Machine(s)",
          chooseMachines: "Choose machines",
          selectDate: "Select Date Range",
          pickDates: "Pick dates",
          generateChart: "Generate Chart",
          machineName: "Machine Name",
            status: "Status",
            output: "Output",
            lastUpdated: "Last Updated",
            active: "Active",
            inactive: "Inactive"
        },
      },
      ko: {
        translation: {
          selectMachines: "기계 선택",
          chooseMachines: "기계를 선택하세요",
          selectDate: "날짜 범위 선택",
          pickDates: "날짜를 선택하세요",
          generateChart: "차트 생성",
          machineName: "기계 이름",
          status: "상태",
          output: "생산량",
          lastUpdated: "최종 업데이트",
          active: "작동 중",
          inactive: "비활성"
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
