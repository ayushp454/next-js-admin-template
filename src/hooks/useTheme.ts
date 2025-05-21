import { useEffect, useState } from 'react';

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // On mount, check user's saved theme or system preference
  useEffect(() => {
    const root = window.document.documentElement;

    // Check localStorage or fallback to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = isDark ? 'light' : 'dark';

    root.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
}
