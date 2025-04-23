"use client";

import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggler from './ThemeToggler';
import styles from '@/styles/layout.module.css';
import ThemedFooter from './ThemedFooter';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      <ThemeToggler />
      <main className={styles.main}>{children}</main>
      <ThemedFooter />
    </ThemeProvider>
  );
}