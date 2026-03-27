import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/UI/Button";
import HighlightText from "@/components/UI/HighLightText";
import { Route } from "@/helpers/route";
import { LINKS } from "@/constants/common";
import { getProjectList, getResumeOverview } from "@/libs/content";
import { IBasePageProps } from "@/types/common";
import classNames from "classnames";

export const metadata: Metadata = {
  title: "首頁 | yoga.dev",
  description: "前端工程師作品集，聚焦 React、Next.js、SEO 與產品導向的介面實作。",
};

const Page = async ({ params }: IBasePageProps) => {
  const { lang } = await params;

  const overview = await getResumeOverview();
  const projects = await getProjectList();

  if (!overview) {
    notFound();
  }

  const { intro, keywords } = overview;
  const caseStudyCount = projects.filter(({ id }) => id !== "ai-prompt-workspace").length;

  return (
    <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      <div className="flex flex-col gap-6 rounded-4xl border border-border-T10 bg-surface-T50/80 p-6 shadow-(--shadow-panel) backdrop-blur md:p-8">
        <div className="flex flex-wrap gap-2 text-[12px] uppercase tracking-[0.16em] text-primary-T20">
          {
            keywords.map((keyword, index) => (
              <span
                className={
                  classNames("rounded-full border border-primary-T10/20 px-3 py-1",
                    index === 0 ? 'border-primary-T10/20 bg-primary-T30' : 'border-border-T10 bg-surface-T50')}
                key={keyword}
                >
                {keyword}
              </span>)
            )
          }
        </div>

        <div className="max-w-3xl text-text-T20 leading-relaxed">
          <HighlightText text={intro} />
        </div>

        <div className="flex flex-col gap-3 pt-2 md:flex-row">
          <Link href={Route.project.list({ lang })} className="w-full md:w-auto">
            <Button size="lg" variant="primary" className="md:w-auto md:min-w-56">
              看作品
            </Button>
          </Link>
          <Link href={Route.resume.detail({ lang })} className="w-full md:w-auto">
            <Button size="lg" variant="outlined" className="md:w-auto md:min-w-56">
              看履歷
            </Button>
          </Link>
        </div>

        <div className="grid gap-3 border-t border-border-T10 pt-5 md:grid-cols-3">
          <div className="rounded-2xl border border-border-T10 bg-surface-T50 p-4">
            <p className="text-[12px] uppercase tracking-[0.14em] text-text-T30">作品數</p>
            <p className="mt-2 text-3xl font-semibold text-primary-T10">{projects.length}</p>
          </div>
          <div className="rounded-2xl border border-border-T10 bg-surface-T50 p-4">
            <p className="text-[12px] uppercase tracking-[0.14em] text-text-T30">案例研究</p>
            <p className="mt-2 text-3xl font-semibold text-primary-T10">{caseStudyCount}</p>
          </div>
          <div className="rounded-2xl border border-border-T10 bg-surface-T50 p-4">
            <p className="text-[12px] uppercase tracking-[0.14em] text-text-T30">社群連結</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-text-T20">
              {LINKS.map(({ type, url }) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-border-T10 px-3 py-1.5 hover:border-primary-T10/50 hover:text-primary-T10"
                >
                  {type}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-80 overflow-hidden rounded-4xl border border-border-T10 bg-surface-T50 shadow-(--shadow-panel)">
          <Image
            src="/picture_me.jpg"
            alt="Profile photo"
            fill
            className="object-cover object-[50%_18%]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/12 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-6">
            <p className="text-[12px] uppercase tracking-[0.18em] text-primary-T20">yoga.dev</p>
            <p className="max-w-sm text-lg font-semibold leading-tight text-white md:text-2xl">
              React、Next.js、SEO、效能優化與自動化測試。
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {projects.slice(0, 2).map(({ id, title, intro: projectIntro }) => (
            <Link
              key={id}
              href={Route.project.detail({ lang, id })}
              className="flex flex-1 flex-col justify-between rounded-[28px] border border-border-T10 bg-surface-T50/80 p-5 shadow-(--shadow-panel) transition-transform hover:-translate-y-1"
            >
              <div className="space-y-2">
                <h3 className="text-xl text-text-T10">{title}</h3>
                <p className="text-sm text-text-T20">{projectIntro}</p>
              </div>
              <span className="mt-5 text-sm font-semibold text-primary-T10">查看作品</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
