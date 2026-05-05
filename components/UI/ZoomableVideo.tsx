"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableVideoProps = {
  src: string;
  caption?: string;
  poster?: string;
  zoomable?: boolean;
  className?: string;
  videoClassName?: string;
  title?: string;
};

export default function ZoomableVideo({
  src,
  caption,
  poster,
  zoomable = true,
  className = "",
  videoClassName = "",
  title,
}: ZoomableVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
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
          aria-label={title ?? caption ?? src}
          disabled={!zoomable}
        >
          <video
            src={src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            controls={false}
            className={[
              "h-auto w-full transition-transform duration-300",
              zoomable ? "group-hover:scale-[1.01]" : "",
              "max-h-[16rem] object-cover",
              videoClassName,
            ].join(" ")}
          />

          {zoomable && (
            <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Open video
            </span>
          )}
        </button>

        {caption && (
          <figcaption className="text-text-T20 text-sm leading-6">
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
            aria-label={title ?? caption ?? src}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative flex h-full w-full items-center justify-center p-4 md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-black/60 px-3 py-2 text-sm text-white transition hover:bg-black/80"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>

              <div className="w-full max-w-6xl">
                {title && (
                  <div className="mb-3 rounded-xl bg-black/50 px-4 py-2 text-sm leading-6 text-white/90">
                    <div className="font-medium">{title}</div>
                    {caption && <div className="mt-1 text-white/75">{caption}</div>}
                  </div>
                )}

                <video
                  src={src}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[88vh] w-full rounded-2xl bg-black object-contain shadow-2xl"
                />
              </div>
            </div>
          </div>,
          portalTarget,
        )}
    </>
  );
}
