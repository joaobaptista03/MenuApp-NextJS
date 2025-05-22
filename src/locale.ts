export const defaultLocale = 'pt';

export type Constants = {
    menuNotFound: string;
    description: string;
    loadingText: string;
    visitedText: string;
    timeText: string;
    timesText: string;
    todayText: string;
};

export const supportedLocales = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
];

export const getConstantsByLocale = (id: string, locale: string): Constants => {
    switch (locale) {
        case 'en':
            return {
                menuNotFound: 'Menu not found.',
                description: id.endsWith('s') ? `${id}' menu` : `${id}'s menu`,
                loadingText: "Loading...",
                visitedText: "Visited",
                timeText: "time",
                timesText: "times",
                todayText: "today",
            };


        default:
            return {
                menuNotFound: 'Menu não encontrado.',
                description: `Menu do ${id}`,
                loadingText: "A carregar...",
                visitedText: "Visitado",
                timeText: "vez",
                timesText: "vezes",
                todayText: "hoje",
            };
    }
};