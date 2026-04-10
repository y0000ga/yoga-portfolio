import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import classNames from "classnames";
import Button from "@/components/UI/Button";
import HighlightText from "@/components/UI/HighLightText";
import { LINKS } from "@/constants/common";
import { Route } from "@/helpers/route";
import { getProjectList, getResumeOverview } from "@/libs/content";
import { getDictionary, hasLocale } from "@/libs/i18n";
import { createPageMetadata, SITE_NAME } from "@/libs/site";
import { IBasePageProps } from "@/types/common";

export const generateMetadata = async ({
  params,
}: IBasePageProps): Promise<Metadata> => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return createPageMetadata({
    lang,
    title: dict.home.metadata.title,
    description: dict.home.metadata.description,
  });
};

const Page = async ({ params }: IBasePageProps) => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const overview = await getResumeOverview();
  const projects = await getProjectList();

  if (!overview) {
    notFound();
  }

  const { intro, keywords } = overview;
  const caseStudyCount = projects.filter(
    ({ id }) => id !== "ai-prompt-workspace",
  ).length;

  return (
    <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      <div className="border-border-T10 bg-surface-T50/80 flex flex-col gap-6 rounded-4xl border p-6 shadow-(--shadow-panel) backdrop-blur md:p-8">
        <div className="text-primary-T20 flex flex-wrap gap-2 text-[12px] tracking-[0.16em] uppercase">
          {keywords.map((keyword, index) => (
            <span
              className={classNames(
                "border-primary-T10/20 rounded-full border px-3 py-1",
                index === 0
                  ? "border-primary-T10/20 bg-primary-T30"
                  : "border-border-T10 bg-surface-T50",
              )}
              key={keyword}
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="text-text-T20 max-w-3xl leading-relaxed">
          <HighlightText text={intro} />
        </div>

        <div className="flex flex-col gap-3 pt-2 md:flex-row">
          <Link
            href={Route.project.list({ lang })}
            className="w-full md:w-auto"
          >
            <Button
              size="lg"
              variant="primary"
              className="md:w-auto md:min-w-56"
            >
              {dict.common.viewProjects}
            </Button>
          </Link>
          <Link
            href={Route.resume.detail({ lang })}
            className="w-full md:w-auto"
          >
            <Button
              size="lg"
              variant="outlined"
              className="md:w-auto md:min-w-56"
            >
              {dict.common.viewResume}
            </Button>
          </Link>
        </div>

        <div className="border-border-T10 grid gap-3 border-t pt-5 md:grid-cols-3">
          <div className="border-border-T10 bg-surface-T50 rounded-2xl border p-4">
            <p className="text-text-T30 text-[12px] tracking-[0.14em] uppercase">
              {dict.home.stats.projects}
            </p>
            <p className="text-primary-T10 mt-2 text-3xl font-semibold">
              {projects.length}
            </p>
          </div>
          <div className="border-border-T10 bg-surface-T50 rounded-2xl border p-4">
            <p className="text-text-T30 text-[12px] tracking-[0.14em] uppercase">
              {dict.home.stats.caseStudies}
            </p>
            <p className="text-primary-T10 mt-2 text-3xl font-semibold">
              {caseStudyCount}
            </p>
          </div>
          <div className="border-border-T10 bg-surface-T50 rounded-2xl border p-4">
            <p className="text-text-T30 text-[12px] tracking-[0.14em] uppercase">
              {dict.home.stats.contact}
            </p>
            <div className="text-text-T20 mt-3 flex flex-wrap gap-2 text-sm">
              {LINKS.map(({ type, url }) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener"
                  className="border-border-T10 hover:border-primary-T10/50 hover:text-primary-T10 rounded-full border px-3 py-1.5"
                >
                  {type}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="border-border-T10 bg-surface-T50 relative min-h-80 overflow-hidden rounded-4xl border shadow-(--shadow-panel)">
          <Image
            src="/picture_me.jpg"
            alt={dict.site.profilePhotoAlt}
            fill
            className="object-cover object-[50%_18%]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/12 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-6">
            <p className="text-primary-T20 text-[12px] tracking-[0.18em] uppercase">
              {dict.home.hero.eyebrow}
            </p>
            <p className="max-w-sm text-lg leading-tight font-semibold text-white md:text-2xl">
              {dict.home.hero.summary}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-border-T10 bg-surface-T50/80 flex min-h-44 flex-col justify-between rounded-[28px] border p-5 shadow-(--shadow-panel)">
            <p className="text-text-T10 max-w-sm text-xl leading-snug">
              {dict.home.hero.cardTitle}
            </p>
            <p className="text-text-T20 pt-5 text-sm">{SITE_NAME}</p>
          </div>

          {projects
            .slice(0, 2)
            .map(({ id, title, intro: projectIntro }) => (
              <Link
                key={id}
                href={Route.project.detail({ lang, id })}
                className="border-border-T10 bg-surface-T50/80 flex flex-1 flex-col justify-between rounded-[28px] border p-5 shadow-(--shadow-panel) transition-transform hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <h3 className="text-text-T10 text-xl">{title}</h3>
                  <p className="text-text-T20 text-sm">
                    {projectIntro}
                  </p>
                </div>
                <span className="text-primary-T10 mt-5 text-sm font-semibold">
                  {dict.home.hero.cardAction}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
