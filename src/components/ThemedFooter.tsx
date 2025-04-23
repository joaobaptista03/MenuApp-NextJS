"use client";

import { useTheme } from '@/components/ThemeProvider';
import styles from '@/styles/layout.module.css';

export default function ThemedFooter() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${theme === 'dark' ? styles.darkModeFooter : ''}`}>
      <p>© {currentYear} MenuApp</p>
    </footer>
  );
}