import type { Metadata } from "next";
import { Lang } from "@/types/common";

export const SITE_NAME = "yoga.dev";
export const SITE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const DEFAULT_CONTENT_LANG = Lang.Zh_Hant_TW;
export const SITE_DESCRIPTION =
  "前端工程師作品集，整理 React、Next.js、TypeScript 與產品型前端專案。";

export const SITE_NAV_ITEMS = [
  {
    key: "project",
    label: "作品集",
  },
  {
    key: "resume",
    label: "履歷",
  },
] as const;

export const resolveContentLang = (lang: string): Lang =>
  lang === Lang.En ? DEFAULT_CONTENT_LANG : (lang as Lang);

export const toCanonicalPath = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/"
    ? `/${DEFAULT_CONTENT_LANG}`
    : `/${DEFAULT_CONTENT_LANG}${normalizedPath}`;
};

type PageMetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  imageAlt?: string;
};

export const createPageMetadata = ({
  title,
  description,
  path = "/",
  imageAlt,
}: PageMetadataOptions): Metadata => {
  const canonical = toCanonicalPath(path);
  const resolvedTitle = title ?? SITE_NAME;
  const resolvedImageAlt = imageAlt ?? description;
  const ogImagePath = `/${DEFAULT_CONTENT_LANG}/opengraph-image`;
  const twitterImagePath = `/${DEFAULT_CONTENT_LANG}/twitter-image`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: canonical,
      images: [
        {
          url: ogImagePath,
          alt: resolvedImageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [
        {
          url: twitterImagePath,
          alt: resolvedImageAlt,
        },
      ],
    },
  };
};
