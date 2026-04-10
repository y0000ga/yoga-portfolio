import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LINKS } from "@/constants/common";
import { Route } from "@/helpers/route";
import {
  getDictionary,
  hasLocale,
  SUPPORTED_LANGS,
} from "@/libs/i18n";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/libs/site";
import "@/styles/globals.css";
import { IBasePageProps } from "@/types/common";
import { BackToTop } from "@/components/UI/Scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f1114",
};

type Props = Readonly<PropsWithChildren<IBasePageProps>>;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: IBasePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      shortcut: [{ url: "/favicon.ico" }],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
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
      lang,
      description: dict.site.description,
    }),
  };
}

const RootLayout = async ({ children, params }: Props) => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  const navs = [
    {
      label: dict.site.nav.project,
      href: Route.project.list({ lang }),
    },
    {
      label: dict.site.nav.resume,
      href: Route.resume.detail({ lang }),
    },
  ];

  return (
    <html
      lang={lang}
      className={classNames(
        geistMono.variable,
        geistSans.variable,
        "h-full antialiased",
      )}
    >
      <body className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 md:gap-10 md:px-8">
        <nav className="border-border-T10 bg-surface-T50/85 fixed inset-x-4 top-4 z-20 mx-auto flex w-auto max-w-7xl flex-col gap-3 rounded-2xl border px-4 py-3 shadow-[var(--shadow-panel)] backdrop-blur sm:flex-row sm:items-center sm:justify-between md:inset-x-8 md:top-6 md:px-6 md:py-4">
          <Link
            href={`/${lang}`}
            className="flex min-w-0 items-center gap-2 md:gap-4"
          >
            <CommandLineIcon className="text-primary-T10 size-6 shrink-0 md:size-12" />
            <span className="text-primary-T10 truncate text-base font-semibold sm:text-lg md:text-3xl">
              {SITE_NAME}
            </span>
          </Link>

          <div className="flex flex-wrap gap-2 text-[13px] sm:justify-end md:gap-3 md:text-[18px]">
            {navs.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-text-T20 hover:bg-primary-T30 hover:text-primary-T10 rounded-full px-3 py-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <main className="mt-36 w-full sm:mt-28 md:mt-36">
          {children}
        </main>

        <BackToTop />

        <footer className="border-border-T10 bg-surface-T50/75 text-text-T30 my-10 grid gap-5 rounded-[28px] border px-5 py-5 shadow-[var(--shadow-panel)] backdrop-blur md:grid-cols-[1fr_auto] md:items-end md:px-6 md:py-6">
          <div className="space-y-2">
            <p className="text-primary-T20 text-[12px] tracking-[0.18em] uppercase">
              {SITE_NAME}
            </p>
            <p className="text-text-T30 text-xs tracking-[0.14em] uppercase">
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
                className="border-border-T10 bg-surface-T50/80 text-text-T20 hover:border-primary-T10/40 hover:text-primary-T10 rounded-full border px-3 py-2 text-sm transition-all"
              >
                {type.toUpperCase()}
              </a>
            ))}
          </div>
        </footer>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
};

export default RootLayout;
