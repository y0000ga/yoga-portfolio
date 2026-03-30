import type { Metadata } from "next";
import Link from "next/link";
import { Route } from "@/helpers/route";
import { getProjectById, getProjectList } from "@/libs/content";
import { IBasePageProps } from "@/types/common";
import { Project } from "@/types/project";
import { PROJECT_TYPE_LABEL } from "@/constants/project";

export const metadata: Metadata = {
  title: "作品集",
  description: "收錄前端案例研究與 side project，涵蓋 SEO、狀態設計、UI 系統與工作流程工具。",
};

const COLUMN_PATTERNS = [
  "lg:col-span-7 lg:row-span-2 min-h-[28rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
  "lg:col-span-7 lg:row-span-1 min-h-[24rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
];

const Page = async ({ params }: IBasePageProps) => {
  const { lang } = await params;

  const projects = await getProjectList();
  const projectDetails = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      detail: await getProjectById(project.id),
    }))
  );

  const caseStudyCount = projectDetails.filter(({ detail }) => detail?.type === Project.CaseStudy).length;
  const sideProjectCount = projectDetails.filter(({ detail }) => detail?.type === Project.SideProject).length;

  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <header className="rounded-4xl border border-border-T10 bg-surface-T50/80 p-5 shadow-(--shadow-panel) backdrop-blur md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row  lg:justify-between">
          <h1 className="text-[36px] leading-none text-text-T10 md:text-[64px]">作品集</h1>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-104">
            {
              [
                { label: '總數', value: projectDetails.length },
                { label: PROJECT_TYPE_LABEL[Project.CaseStudy], value: caseStudyCount },
                { label: PROJECT_TYPE_LABEL[Project.SideProject], value: sideProjectCount },
              ].map(({ value, label }) => (
                <div className="rounded-3xl border border-border-T10 bg-surface-T40/60 p-4" key={label}>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-text-T30">{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-primary-T10">{value}</p>
                </div>))
            }
          </div>
        </div>
      </header>

      <ul className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(10rem,auto)]">
        {projectDetails.map(({ title, intro, id, detail }, index) => {
          const image = detail?.demos[0];
          const pattern = COLUMN_PATTERNS[index % COLUMN_PATTERNS.length];
          const isFeatured = index === 0;

          return (
            <li key={index} className={pattern}>
              <Link
                href={Route.project.detail({ lang, id })}
                className="group relative flex h-full overflow-hidden rounded-4xl border border-border-T10 bg-surface-T50/85 shadow-(--shadow-panel) transition-all hover:-translate-y-1 hover:border-primary-T10/45"
              >
                {image && (
                  <div
                    className={
                      isFeatured
                        ? "absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                        : "absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-28"
                    }
                    style={{ backgroundImage: `url(${image.mediaURL})` }}
                  />
                )}
                <div
                  className={
                    isFeatured
                      ? "absolute inset-0 bg-linear-to-br from-surface-T10/10 via-surface-T10/55 to-surface-T10/95"
                      : "absolute inset-0 bg-linear-to-br from-surface-T10/25 via-surface-T10/65 to-surface-T10/95"
                  }
                />

                <div
                  className={
                    isFeatured
                      ? "relative flex h-full w-full flex-col justify-between p-6 md:p-8"
                      : "relative flex h-full w-full flex-col justify-between p-5 md:p-6"
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] uppercase tracking-[0.2em] text-primary-T20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isFeatured && (
                          <span className="rounded-full border border-primary-T10/35 bg-primary-T30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary-T10 shadow-[var(--shadow-glow)]">
                            精選
                          </span>
                        )}
                        <span className="rounded-full border border-primary-T10/20 bg-primary-T30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary-T20">
                          {detail ? PROJECT_TYPE_LABEL[detail.type] : "作品"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3
                        className={
                          isFeatured
                            ? "max-w-2xl text-[34px] leading-[1.02] text-text-T10 md:text-[52px]"
                            : "max-w-xl text-[28px] leading-tight text-text-T10 md:text-[36px]"
                        }
                      >
                        {title}
                      </h3>
                      <p
                        className={
                          isFeatured
                            ? "max-w-2xl text-lg leading-relaxed text-text-T20 md:text-[18px]"
                            : "max-w-2xl text-base text-text-T20"
                        }
                      >
                        {intro}
                      </p>
                    </div>
                  </div>
                  {isFeatured ? (
                    <div className="grid gap-4 border-t border-border-T10 pt-5 md:grid-cols-[1fr_auto] md:items-end">
                      <div className="flex min-w-52 flex-col items-start gap-3 rounded-3xl px-4 py-3 md:items-end">
                        <span className="text-base font-semibold text-primary-T10">查看內容</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end justify-between gap-4 border-t border-border-T10 pt-4">
                      <span className="shrink-0 text-sm font-semibold text-primary-T10">查看內容</span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Page;
