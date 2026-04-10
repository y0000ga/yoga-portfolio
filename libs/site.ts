import type { Metadata } from "next";
import { Lang } from "@/types/common";

export const SITE_NAME = "yoga.dev";
export const SITE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
export const DEFAULT_LANG = Lang.Zh_Hant_TW;

export const toCanonicalPath = (lang: Lang, path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localizedRoot = `/${lang}`;

  return normalizedPath === "/"
    ? localizedRoot
    : `${localizedRoot}${normalizedPath}`;
};

type PageMetadataOptions = {
  lang: Lang;
  title?: string;
  description: string;
  path?: string;
  imageAlt?: string;
};

export const createPageMetadata = ({
  lang,
  title,
  description,
  path = "/",
  imageAlt,
}: PageMetadataOptions): Metadata => {
  const canonical = toCanonicalPath(lang, path);
  const resolvedTitle = title ?? SITE_NAME;
  const resolvedImageAlt = imageAlt ?? description;
  const ogImagePath = `/${lang}/opengraph-image`;
  const twitterImagePath = `/${lang}/twitter-image`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: {
        [Lang.En]: toCanonicalPath(Lang.En, path),
        [Lang.Zh_Hant_TW]: toCanonicalPath(Lang.Zh_Hant_TW, path),
      },
    },
    openGraph: {
      type: "website",
      locale: lang === Lang.En ? "en_US" : "zh_TW",
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
