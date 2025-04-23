"use client";

import { useTheme } from '@/components/ThemeProvider';
import { useEffect } from 'react';
import styles from '@/app/[id]/layout.module.css';

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <button onClick={toggleTheme} className={styles.themeToggleButton} aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}>
      {theme === 'light' ? <img src="light-mode.png" alt="Light Mode" style={{ height: '24px', width: '51px' }} /> : <img src="dark-mode.png" alt="Dark Mode" style={{ height: '24px', width: '51px' }} />}
    </button>
  );
}