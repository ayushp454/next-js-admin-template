'use client';
import { useThemeToggle } from "@/hooks/useTheme";

export default function Home() {
  const { isDark, toggleTheme } = useThemeToggle();
  return (
    <main className="bg-background p-3 border-1 border-amber-200 ">
      <h1 className="text-primary-500 mb-3">
        Change theme color <br />
        <u>-primary-500:</u> <br /> Ligth: blue & Dark: Green
      </h1>

      <hr className="dark:text-white mb-3" />

      <p className="text-secondary-500 dark:text-primary-300 mb-3">
        Current theme:  {isDark ? 'Dark' : 'Light'} <br />
        <u>Light mode: -secondary-500</u> <br />
        <u>Dark mode: -primary-300</u> <br />
        <u className="text-success-300">color-success-300</u>
      </p>

      <hr className="dark:text-white mb-3" />

      <button onClick={toggleTheme} className="bg-amber-200 border-amber-200 dark:bg-primary-600 dark:text-gray-50 dark:border-none p-2 border-1 mb-3 rounded-lg">
        Toggle Theme
      </button>
    </main>
  );
}
