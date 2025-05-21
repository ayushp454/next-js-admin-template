'use client';
import { useThemeToggle } from "@/hooks/useTheme";
import Link from "next/link";

export default function Home() {
  const { isDark } = useThemeToggle();
  return (
    <main className="bg-background p-3 border-1 border-amber-200">
      <h3 className="text-primary-500 mb-3">
        Change theme color <br />
        <u>-primary-500:</u> <br /> Ligth: blue & Dark: Green
      </h3>

      <hr className="dark:text-white mb-3" />

      <p className="text-secondary-500 dark:text-primary-300 mb-3">
        Current theme:  {isDark ? 'Dark' : 'Light'} <br />
        <u>Light mode: -secondary-500</u> <br />
        <u>Dark mode: -primary-300</u> <br />
        <u className="text-success-300">color-success-300</u>
      </p>

      <hr className="dark:text-white mb-3" />

      <section id="button">
        <h2 className="text-primary-500">Buttons</h2>
        <div className="flex gap-1">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Primary Button</button>
          <button className="btn-accent">Accent Button</button>
          <button className="btn-outline">Outline Button</button>
        </div>
      </section>

      <ul className="mb-4">
        <li>
          <Link href="/button">Button</Link>
        </li>
      </ul>
    </main>
  );
}
