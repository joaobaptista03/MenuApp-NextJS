'use client';

import { createContext, useState, useCallback, useContext, ReactNode, useEffect } from 'react';
import styles from '@/styles/themeLayout.module.css';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { supportedLocales } from '@/locale';
import { themedClassName } from '@/auxFuncs';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme, toggleTheme: () => void } | undefined>(undefined);

export const ThemeLayout = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const handleLocaleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    const currentPathSegments = pathname.split('/');
    currentPathSegments[1] = newLocale;
    const newPath = currentPathSegments.join('/');
    router.push(newPath);
  }, [pathname, router]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <button onClick={toggleTheme} className={styles.themeToggleButton} aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}>
        {theme === 'light' ? <img src="/light-mode.png" alt="Light Mode" style={{ height: '24px', width: '51px' }} /> : <img src="/dark-mode.png" alt="Dark Mode" style={{ height: '24px', width: '51px' }} />}
      </button>

      <div className={themedClassName('languageSelectContainer', theme, styles)}>
        <label htmlFor="language-select" className={themedClassName('languageLabel', theme, styles)}></label>
        <select
          id="language-select"
          value={currentLocale}
          onChange={handleLocaleChange}
          className={themedClassName('languageDropdown', theme, styles)}
        >
          {supportedLocales.map((loc) => (
            <option key={loc.code} value={loc.code}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

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