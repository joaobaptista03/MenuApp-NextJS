// @/components/ThemeWrapper.tsx
"use client";

import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggler from './ThemeToggler';
import styles from '@/app/[id]/layout.module.css';
import ThemedFooter from './ThemedFooter'; // Import the client footer

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