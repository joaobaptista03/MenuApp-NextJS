"use client";

import { useTheme } from '@/components/ThemeProvider';
import styles from '@/styles/layout.module.css';

export default function ThemedFooter() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f0f0f0',
    color: theme === 'dark' ? '#f0f0f0' : '#333',
    padding: '1rem',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle} className={styles.footer}>
      <p>© {currentYear} MenuApp</p>
    </footer>
  );
}