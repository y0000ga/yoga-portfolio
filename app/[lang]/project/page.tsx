import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Route } from "@/helpers/route";
import { getProjectById, getProjectList } from "@/libs/content";
import { getDictionary, hasLocale } from "@/libs/i18n";
import { createPageMetadata } from "@/libs/site";
import { IBasePageProps } from "@/types/common";
import { Project } from "@/types/project";
import { getProjectTypeLabels } from "@/constants/project";

const COLUMN_PATTERNS = [
  "lg:col-span-7 lg:row-span-2 min-h-[28rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
  "lg:col-span-7 lg:row-span-1 min-h-[24rem]",
  "lg:col-span-5 lg:row-span-1 min-h-[20rem]",
];

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
    title: dict.project.metadata.title,
    description: dict.project.metadata.description,
    path: "/project",
  });
};

const Page = async ({ params }: IBasePageProps) => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const projectTypeLabels = getProjectTypeLabels(lang);
  const projects = await getProjectList();
  const projectDetails = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      detail: await getProjectById(project.id),
    })),
  );

  const caseStudyCount = projectDetails.filter(
    ({ detail }) => detail?.type === Project.CaseStudy,
  ).length;
  const sideProjectCount = projectDetails.filter(
    ({ detail }) => detail?.type === Project.SideProject,
  ).length;

  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <header className="border-border-T10 bg-surface-T50/80 rounded-4xl border p-5 shadow-(--shadow-panel) backdrop-blur md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <h1 className="text-text-T10 text-[36px] leading-none md:text-[64px]">
            {dict.project.heading}
          </h1>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-104">
            {[
              {
                label: dict.project.countLabel,
                value: projectDetails.length,
              },
              {
                label: projectTypeLabels[Project.CaseStudy],
                value: caseStudyCount,
              },
              {
                label: projectTypeLabels[Project.SideProject],
                value: sideProjectCount,
              },
            ].map(({ value, label }) => (
              <div
                className="border-border-T10 bg-surface-T40/60 rounded-3xl border p-4"
                key={label}
              >
                <p className="text-text-T30 text-[12px] tracking-[0.14em] uppercase">
                  {label}
                </p>
                <p className="text-primary-T10 mt-2 text-3xl font-semibold">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <ul className="grid gap-4 lg:auto-rows-[minmax(10rem,auto)] lg:grid-cols-12">
        {projectDetails.map(({ title, intro, id, detail }, index) => {
          const image = detail?.demos[0];
          const pattern =
            COLUMN_PATTERNS[index % COLUMN_PATTERNS.length];
          const isFeatured = index === 0;

          return (
            <li
              key={id}
              className={pattern}
            >
              <Link
                href={Route.project.detail({ lang, id })}
                className="group border-border-T10 bg-surface-T50/85 hover:border-primary-T10/45 relative flex h-full overflow-hidden rounded-4xl border shadow-(--shadow-panel) transition-all hover:-translate-y-1"
              >
                {image && (
                  <div
                    className={
                      isFeatured
                        ? "absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                        : "absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-28"
                    }
                    style={{
                      backgroundImage: `url(${image.mediaURL})`,
                    }}
                  />
                )}
                <div
                  className={
                    isFeatured
                      ? "from-surface-T10/10 via-surface-T10/55 to-surface-T10/95 absolute inset-0 bg-linear-to-br"
                      : "from-surface-T10/25 via-surface-T10/65 to-surface-T10/95 absolute inset-0 bg-linear-to-br"
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
                        <span className="text-primary-T20 text-[12px] tracking-[0.2em] uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isFeatured && (
                          <span className="border-primary-T10/35 bg-primary-T30 text-primary-T10 rounded-full border px-3 py-1 text-[11px] tracking-[0.14em] uppercase shadow-[var(--shadow-glow)]">
                            {dict.project.featured}
                          </span>
                        )}
                        <span className="border-primary-T10/20 bg-primary-T30 text-primary-T20 rounded-full border px-3 py-1 text-[11px] tracking-[0.14em] uppercase">
                          {detail
                            ? projectTypeLabels[detail.type]
                            : dict.project.typeLabelFallback}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3
                        className={
                          isFeatured
                            ? "text-text-T10 max-w-2xl text-[34px] leading-[1.02] md:text-[52px]"
                            : "text-text-T10 max-w-xl text-[28px] leading-tight md:text-[36px]"
                        }
                      >
                        {title}
                      </h3>
                      <p
                        className={
                          isFeatured
                            ? "text-text-T20 max-w-2xl text-lg leading-relaxed md:text-[18px]"
                            : "text-text-T20 max-w-2xl text-base"
                        }
                      >
                        {intro}
                      </p>
                    </div>
                  </div>
                  {isFeatured ? (
                    <div className="border-border-T10 grid gap-4 border-t pt-5 md:grid-cols-[1fr_auto] md:items-end">
                      <div className="flex min-w-52 flex-col items-start gap-3 rounded-3xl px-4 py-3 md:items-end">
                        <span className="text-primary-T10 text-base font-semibold">
                          {dict.project.openCaseStudy}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="border-border-T10 flex items-end justify-between gap-4 border-t pt-4">
                      <span className="text-primary-T10 shrink-0 text-sm font-semibold">
                        {dict.project.openCaseStudy}
                      </span>
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
