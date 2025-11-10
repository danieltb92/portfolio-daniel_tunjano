import data from '@/data/dataPage.json';

// const dataEs = data.es || {};


export const languageList = {
    es: 'Español',
    en: 'English',
} as const;

export const labels = {
    es: data.es,
    en: data.en,
} as const;