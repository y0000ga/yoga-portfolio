import {
  createOgImage,
  ogContentType,
  ogSize,
} from "@/libs/og-image";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return createOgImage();
}
