import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Lang } from "@/types/common";

const DEFAULT_LANG = Lang.Zh_Hant_TW;
const SUPPORTED_LANGS = new Set<string>([Lang.En, Lang.Zh_Hant_TW]);
const LOCALE_SEGMENT_PATTERN = /^[a-z]{2}(?:-[A-Za-z0-9]{2,8})*$/;

const getLocalizedPathname = (pathname: string) => {
  if (pathname === "/") {
    return `/${DEFAULT_LANG}`;
  }

  const segments = pathname.split("/").filter(Boolean);
  const [firstSegment, ...restSegments] = segments;

  if (firstSegment && SUPPORTED_LANGS.has(firstSegment)) {
    return null;
  }

  const normalizedSegments =
    firstSegment && LOCALE_SEGMENT_PATTERN.test(firstSegment)
      ? restSegments
      : segments;

  const normalizedPath = normalizedSegments.length
    ? `/${normalizedSegments.join("/")}`
    : "";

  return `/${DEFAULT_LANG}${normalizedPath}`;
};

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.endsWith("/opengraph-image") ||
    pathname.endsWith("/twitter-image")
  ) {
    return NextResponse.next();
  }

  const localizedPathname = getLocalizedPathname(pathname);

  if (!localizedPathname || localizedPathname === pathname) {
    return NextResponse.next();
  }

  const redirectUrl = new URL(
    `${localizedPathname}${search}`,
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
