'use client';

import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark' ? 'dark' : 'light');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};