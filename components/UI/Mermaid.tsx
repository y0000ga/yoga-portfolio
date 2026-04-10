"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import mermaid, { initMermaid } from "@/libs/mermaid";
import type { MermaidConfig } from "mermaid";

type ZoomableMermaidProps = {
  chart: string;
  title?: string;
  caption?: string;
  theme?: MermaidConfig["theme"];
  className?: string;
  previewClassName?: string;
  modalClassName?: string;
  zoomable?: boolean;
};

const normalizeSvg = (svgMarkup: string) => {
  if (typeof window === "undefined") return svgMarkup;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgMarkup, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) return svgMarkup;

  // 頁面內預覽 / modal 都更容易控制
  svg.removeAttribute("height");
  svg.removeAttribute("width");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  svg.style.display = "block";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.maxWidth = "100%";

  return svg.outerHTML;
};

export default function ZoomableMermaid({
  chart,
  title,
  caption,
  theme,
  className = "",
  previewClassName = "",
  modalClassName = "",
  zoomable = true,
}: ZoomableMermaidProps) {
  const reactId = useId();
  const renderId = useMemo(
    () => `mermaid-${reactId.replace(/[:]/g, "")}`,
    [reactId],
  );

  const previewRef = useRef<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const portalTarget =
    typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        initMermaid(theme);
        setError(null);

        const { svg: rawSvg } = await mermaid.render(renderId, chart);
        const normalizedSvg = normalizeSvg(rawSvg);

        if (!active) return;
        setSvg(normalizedSvg);
      } catch (err) {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Mermaid render failed",
        );
        setSvg("");
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [chart, theme, renderId]);

  useEffect(() => {
    if (!previewRef.current) return;
    previewRef.current.innerHTML = svg;
  }, [svg]);

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

  if (error) {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Mermaid error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <figure className={`flex flex-col gap-3 ${className}`}>
        <button
          type="button"
          onClick={() => zoomable && setIsOpen(true)}
          disabled={!zoomable}
          className={[
            "group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left",
            "focus:ring-2 focus:ring-blue-300 focus:outline-none",
            zoomable ? "cursor-zoom-in" : "cursor-default",
          ].join(" ")}
          aria-label={
            zoomable ? `放大查看 Mermaid 圖：${title ?? ""}` : title
          }
        >
          <div
            className={[
              "w-full overflow-hidden p-4 md:p-6",
              // 這層高度很重要，否則 SVG 會被壓得很小
              "min-h-[320px] md:min-h-[420px]",
              previewClassName,
            ].join(" ")}
          >
            <div
              ref={previewRef}
              className="mermaid-preview flex h-full w-full items-center justify-center"
            />
          </div>

          {zoomable && (
            <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              點擊放大
            </span>
          )}
        </button>

        {(title || caption) && (
          <figcaption className="flex flex-col gap-1">
            {title && (
              <div className="text-base font-medium text-neutral-900">
                {title}
              </div>
            )}
            {caption && (
              <div className="text-sm leading-6 text-neutral-600">
                {caption}
              </div>
            )}
          </figcaption>
        )}
      </figure>

      {portalTarget &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] bg-black/85"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Mermaid diagram"}
            onClick={() => setIsOpen(false)}
          >
            <div
              className={[
                "relative flex h-full w-full flex-col",
                modalClassName,
              ].join(" ")}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
                <div className="pointer-events-auto w-full rounded-xl bg-black/50 px-4 py-2 text-sm leading-6 text-white/90">
                  {title && (
                    <div className="font-medium">{title}</div>
                  )}
                  {caption && (
                    <div
                      className={title ? "mt-1 text-white/75" : ""}
                    >
                      {caption}
                    </div>
                  )}
                </div>
              </div>

              <TransformWrapper
                initialScale={1}
                minScale={0.6}
                maxScale={8}
                doubleClick={{ mode: "zoomIn" }}
                wheel={{ step: 0.12 }}
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
                          label: "放大",
                        },
                        {
                          onClick: () => zoomOut(),
                          label: "縮小",
                        },
                        {
                          onClick: () => resetTransform(),
                          label: "重設",
                        },
                        {
                          onClick: () => setIsOpen(false),
                          label: "關閉",
                        },
                      ].map(({ onClick, label }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={onClick}
                          className="pointer-events-auto rounded-full bg-black/60 px-3 py-2 text-sm text-white transition hover:bg-black/80"
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
                        <div className="flex h-full w-full items-center justify-center">
                          <div
                            className="mermaid-modal-content h-[min(900px,88vh)] w-[min(1600px,92vw)] rounded-2xl bg-white p-6 shadow-2xl"
                            dangerouslySetInnerHTML={{ __html: svg }}
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
