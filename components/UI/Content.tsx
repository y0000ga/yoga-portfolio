import classNames from "classnames";
import { ElementType, PropsWithChildren, ReactNode } from "react";
import HighlightText from "./HighLightText";

const ICON_CLASSNAME = "fill-primary-T10 size-6";

export const ListItem = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <li
      className={classNames(
        "flex flex-col gap-3 md:gap-4",
        "border-border-T10 bg-surface-T40/60 rounded-2xl border p-4 shadow-[var(--shadow-panel)] md:p-6",
      )}
    >
      <h4 className="text-text-T10">{title}</h4>
      {children}
    </li>
  );
};

export const InfoList = ({ list }: { list: string[] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {list.map((item) => (
        <li
          className="text-text-T20 relative pl-5"
          key={item}
        >
          <span className="bg-primary-T10 absolute top-[0.7em] left-0 h-2 w-2 rounded-full shadow-[0_0_12px_hsl(188_100%_62%_/_0.8)]" />
          <HighlightText text={item} />
        </li>
      ))}
    </ul>
  );
};

export const FAQList = ({
  list,
}: {
  list: Array<{ question: string; answer: string }>;
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {list.map(({ question, answer }) => (
        <li
          key={question}
          className="border-border-T10 bg-surface-T40/60 rounded-[24px] border shadow-[var(--shadow-panel)]"
        >
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-2 py-2 md:px-3 md:py-3">
              <h6 className="text-text-T10 text-left leading-relaxed">
                {question}
              </h6>
              <span className="bg-surface-T50 text-primary-T10 border-border-T10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45">
                <span className="relative block h-3.5 w-3.5">
                  <span className="bg-current absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
                  <span className="bg-current absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />
                </span>
              </span>
            </summary>
            <div className="border-border-T10/70 text-text-T20 border-t px-4 pb-4 pt-1 leading-7 md:px-5 md:pb-5">
              <p>{answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
};

export const LocationPeriod = ({
  location,
  startFrom,
  endAt,
}: {
  location: string;
  startFrom: string;
  endAt: string;
}) => {
  return (
    <h5>
      {location} •{" "}
      <span className="text-text-T30">
        {startFrom} - {endAt}
      </span>
    </h5>
  );
};

type InfoItemProps = {
  icon: ElementType;
  children?: ReactNode;
  url?: string;
};

export const IconInfo = ({
  icon: Icon,
  children,
  url,
}: InfoItemProps) => {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-border-T10 bg-surface-T50 text-primary-T10 hover:border-primary-T10/60 hover:bg-primary-T30 flex h-11 w-11 items-center justify-center rounded-full border shadow-[var(--shadow-panel)] transition-all hover:-translate-y-0.5"
      >
        <Icon className={ICON_CLASSNAME} />
      </a>
    );
  }
  return (
    <div className="border-border-T10 bg-surface-T50 flex items-center gap-3 rounded-2xl border px-3 py-2 shadow-[var(--shadow-panel)]">
      <Icon className={ICON_CLASSNAME} />
      <div>{children}</div>
    </div>
  );
};
