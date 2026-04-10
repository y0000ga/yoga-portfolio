"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { getDictionarySync, hasLocale } from "@/libs/i18n";
import { Lang } from "@/types/common";

type ZoomableImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  zoomable?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
  objectFit?: "contain" | "cover";
};

export default function ZoomableImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  zoomable = true,
  priority = false,
  className = "",
  imageClassName = "",
  captionClassName = "",
  objectFit = "contain",
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<{ lang?: string }>();
  const lang =
    params?.lang && hasLocale(params.lang)
      ? params.lang
      : Lang.Zh_Hant_TW;
  const dict = getDictionarySync(lang);
  const portalTarget =
    typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const objectClass =
    objectFit === "cover" ? "object-cover" : "object-contain";

  return (
    <>
      <figure className={`flex flex-col gap-3 ${className}`}>
        <button
          type="button"
          onClick={() => zoomable && setIsOpen(true)}
          className={[
            "group border-border-T10 bg-surface-T50/80 relative overflow-hidden rounded-2xl border",
            "focus:ring-primary-T10/40 focus:ring-2 focus:outline-none",
            zoomable ? "cursor-zoom-in" : "cursor-default",
          ].join(" ")}
          aria-label={
            zoomable ? `${dict.common.zoomIn}: ${alt}` : alt
          }
          disabled={!zoomable}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={[
              "h-auto w-full transition-transform duration-300",
              zoomable ? "group-hover:scale-[1.01]" : "",
              objectClass,
              imageClassName,
            ].join(" ")}
          />

          {zoomable && (
            <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {dict.common.zoomIn}
            </span>
          )}
        </button>

        {caption && (
          <figcaption
            className={[
              "text-text-T20 text-sm leading-6",
              captionClassName,
            ].join(" ")}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {portalTarget &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-999 bg-black/85"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative flex h-full w-full flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
                <div className="pointer-events-auto max-w-3xl rounded-xl bg-black/50 px-4 py-2 text-sm leading-6 text-white/90">
                  <div className="font-medium">{alt}</div>
                  {caption && (
                    <div className="mt-1 text-white/75">
                      {caption}
                    </div>
                  )}
                </div>
              </div>

              <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={6}
                doubleClick={{ mode: "zoomIn" }}
                wheel={{ step: 0.15 }}
                pinch={{ step: 5 }}
                panning={{ velocityDisabled: true }}
                centerOnInit
              >
                {({ resetTransform, zoomIn, zoomOut }) => (
                  <>
                    <div className="pointer-events-none absolute top-4 right-4 z-30 flex gap-2">
                      {[
                        {
                          onClick: () => zoomIn(),
                          label: dict.common.zoomIn,
                          ariaLabel: dict.common.zoomIn,
                        },
                        {
                          onClick: () => zoomOut(),
                          label: dict.common.zoomOut,
                          ariaLabel: dict.common.zoomOut,
                        },
                        {
                          onClick: () => resetTransform(),
                          label: dict.common.reset,
                          ariaLabel: dict.common.reset,
                        },
                        {
                          onClick: () => setIsOpen(false),
                          label: dict.common.close,
                          ariaLabel: dict.common.close,
                        },
                      ].map(({ onClick, label, ariaLabel }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={onClick}
                          className="pointer-events-auto rounded-full bg-black/60 px-3 py-2 text-sm text-white transition hover:bg-black/80"
                          aria-label={ariaLabel}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="flex h-full w-full items-center justify-center overflow-hidden p-4 md:p-8">
                      <TransformComponent
                        wrapperClass="!h-full !w-full"
                        contentClass="!flex !h-full !w-full items-center justify-center"
                      >
                        <div className="relative flex h-full w-full items-center justify-center">
                          <Image
                            src={src}
                            alt={alt}
                            width={width * 3}
                            height={height * 3}
                            priority
                            className="max-h-[88vh] w-auto max-w-full object-contain select-none"
                            draggable={false}
                          />
                        </div>
                      </TransformComponent>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>,
          portalTarget,
        )}
    </>
  );
}
