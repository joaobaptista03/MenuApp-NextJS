'use client';

import { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import styles from '@/styles/themeLayout.module.css';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme, toggleTheme: () => void } | undefined>(undefined);

export const ThemeLayout = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <button onClick={toggleTheme} className={styles.themeToggleButton} aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}>
        {theme === 'light' ? <img src="light-mode.png" alt="Light Mode" style={{ height: '24px', width: '51px' }} /> : <img src="dark-mode.png" alt="Dark Mode" style={{ height: '24px', width: '51px' }} />}
      </button>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeLayout');
  }
  return context;
};