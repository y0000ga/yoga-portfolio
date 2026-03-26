import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import BackToTop from "@/components/UI/BackToTop";
import { LINKS } from "@/constants/common";
import { Route } from "@/helpers/route";
import {
  createPageMetadata,
  resolveContentLang,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAV_ITEMS,
  SITE_URL,
} from "@/libs/site";
import "@/styles/globals.css";
import { IBasePageProps } from "@/types/common";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "SEO",
  ],
  robots: {
    index: true,
    follow: true,
  },
  ...createPageMetadata({
    description: SITE_DESCRIPTION,
  }),
};

type Props = Readonly<PropsWithChildren<IBasePageProps>>;

const RootLayout = async ({ children, params }: Props) => {
  const { lang } = await params;
  const contentLang = resolveContentLang(lang);

  const navs = SITE_NAV_ITEMS.map(({ key, label }) => ({
    label,
    href:
      key === "project"
        ? Route.project.list({ lang: contentLang })
        : Route.resume.detail({ lang: contentLang }),
  }));

  return (
    <html
      lang={contentLang}
      className={classNames(
        geistMono.variable,
        geistSans.variable,
        "h-full antialiased"
      )}
    >
      <body className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 md:gap-10 md:px-8">
        <nav className="fixed left-1/2 top-4 z-20 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-border-T10 bg-surface-T50/85 px-4 py-3 shadow-[var(--shadow-panel)] backdrop-blur md:top-6 md:w-[calc(100%-4rem)] md:px-6 md:py-4">
          <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-4">
            <CommandLineIcon className="size-6 text-primary-T10 md:size-12" />
            <span className="text-lg font-semibold text-primary-T10 md:text-3xl">
              {SITE_NAME}
            </span>
          </Link>

          <div className="flex gap-2 text-[14px] md:gap-3 md:text-[18px]">
            {navs.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="rounded-full px-3 py-2 text-text-T20 hover:bg-primary-T30 hover:text-primary-T10"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <main className="mt-28 w-full md:mt-36">{children}</main>

        <BackToTop />

        <footer className="my-10 grid gap-5 rounded-[28px] border border-border-T10 bg-surface-T50/75 px-5 py-5 text-text-T30 shadow-[var(--shadow-panel)] backdrop-blur md:grid-cols-[1fr_auto] md:items-end md:px-6 md:py-6">
          <div className="space-y-2">
            <p className="text-[12px] uppercase tracking-[0.18em] text-primary-T20">
              {SITE_NAME}
            </p>
            <p className="text-xs uppercase tracking-[0.14em] text-text-T30">
              {dayjs().format("YYYY")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {LINKS.map(({ type, url }) => (
              <a
                key={type}
                href={url}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-border-T10 bg-surface-T50/80 px-3 py-2 text-sm text-text-T20 transition-all hover:border-primary-T10/40 hover:text-primary-T10"
              >
                {type.toUpperCase()}
              </a>
            ))}
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
