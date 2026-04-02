import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import pt from './locales/pt.json'

const LANGUAGE_STORAGE_KEY = 'search-devs-language'
const browserLanguage = navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
const initialLanguage = savedLanguage || browserLanguage

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        pt: { translation: pt },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

i18n.on('languageChanged', (language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
})

export default i18n
