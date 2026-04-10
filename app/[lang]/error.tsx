"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/UI/Button";
import { getDictionarySync, hasLocale } from "@/libs/i18n";
import { Lang } from "@/types/common";

interface IProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

const Error = ({ error, unstable_retry }: IProps) => {
  const params = useParams<{ lang?: string }>();
  const lang =
    params?.lang && hasLocale(params.lang)
      ? params.lang
      : Lang.Zh_Hant_TW;
  const dict = getDictionarySync(lang);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-border-T10 bg-surface-T50/80 flex flex-1 flex-col items-center justify-center gap-4 rounded-4xl border p-8 text-center shadow-[var(--shadow-panel)]">
      <h1 className="text-text-T10 text-3xl font-semibold">
        {dict.error.title}
      </h1>
      <Button
        variant="primary"
        size="lg"
        className="md:w-auto md:min-w-56"
        onClick={() => unstable_retry()}
      >
        {dict.common.retry}
      </Button>
    </section>
  );
};

export default Error;
