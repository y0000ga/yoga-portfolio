import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconInfo, InfoList } from "@/components/UI/Content";
import { GithubIcon } from "@/components/UI/Icon";
import { AsidePage } from "@/components/UI/Page";
import Paragraph from "@/components/UI/Paragraph";
import ZoomableImage from "@/components/UI/ZoomableImage";
import {
  getProjectParagraphLabels,
  getProjectTypeLabels,
} from "@/constants/project";
import { Route } from "@/helpers/route";
import { getProjectById } from "@/libs/content";
import { getDictionary, hasLocale } from "@/libs/i18n";
import { createPageMetadata } from "@/libs/site";
import { Project, ProjectParagraph } from "@/types/project";
import Mermaid from "@/components/UI/Mermaid";

interface IProjectPageProps {
  params: Promise<{
    id: string;
    lang: string;
  }>;
}

const PARAGRAPH_ORDER = [
  ProjectParagraph.Demo,
  ProjectParagraph.Problem,
  ProjectParagraph.Solution,
  ProjectParagraph.Impact,
  ProjectParagraph.RelativeProject,
];

export const generateMetadata = async ({
  params,
}: IProjectPageProps): Promise<Metadata> => {
  const { id, lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const project = await getProjectById(id);

  if (!project) {
    return createPageMetadata({
      lang,
      title: dict.project.detailFallbackTitle,
      description: dict.project.metadata.description,
      path: `/project/${id}`,
    });
  }

  return createPageMetadata({
    lang,
    title: project.title,
    description: project.intro,
    path: `/project/${id}`,
  });
};

const Page = async ({ params }: IProjectPageProps) => {
  const { id, lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const paragraphLabels = getProjectParagraphLabels(lang);
  const projectTypeLabels = getProjectTypeLabels(lang);

  const {
    type,
    title,
    problems,
    impacts,
    architecture,
    intro,
    solution,
    techStack,
    relatedProjects,
  } = project;

  const navs = PARAGRAPH_ORDER.map((paragraphId) => ({
    id: paragraphId,
    title: paragraphLabels[paragraphId],
  })).filter((item) => {
    return !(
      (project.demos.length === 0 &&
        item.id === ProjectParagraph.Demo) ||
      (relatedProjects?.length === 0 &&
        item.id === ProjectParagraph.RelativeProject)
    );
  });

  const getShowcaseClassName = () => "mx-auto w-full md:w-1/2";

  return (
    <AsidePage navs={navs}>
      <section className="border-border-T10 bg-surface-T50/80 grid w-full gap-5 rounded-4xl border p-5 shadow-(--shadow-panel) backdrop-blur md:p-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-border-T10 bg-surface-T40/70 text-text-T20 rounded-full border px-3 py-1 text-sm leading-none">
              {projectTypeLabels[type]}
            </span>

            {type === Project.SideProject && (
              <IconInfo
                icon={GithubIcon}
                url={project.repoURL}
              />
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-primary-T10 text-4xl md:text-6xl">
              {title}
            </h1>
            <h4 className="text-text-T20">{intro}</h4>
            <div className="flex flex-wrap items-center gap-3">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="border-primary-T10/25 bg-primary-T30 text-primary-T20 rounded-full border px-3 py-1 text-[12px] tracking-[0.16em] uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {type === Project.CaseStudy && (
            <div className="border-border-T10 bg-surface-T40/60 grid gap-3 rounded-[28px] border p-4 md:grid-cols-3 md:p-5">
              {[
                {
                  label: dict.project.context.scale,
                  value: project.context.scale,
                },
                {
                  label: dict.project.context.team,
                  value: project.context.team,
                },
                {
                  label: dict.project.context.role,
                  value: project.context.role,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="border-border-T10 bg-surface-T50 rounded-2xl border p-4"
                >
                  <p className="text-primary-T20 text-[12px] tracking-[0.14em] uppercase">
                    {label}
                  </p>
                  <p className="text-text-T20 mt-2 text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {relatedProjects?.length > 0 && (
        <Paragraph
          id={ProjectParagraph.RelativeProject}
          title={paragraphLabels[ProjectParagraph.RelativeProject]}
        >
          {relatedProjects.map(({ id: relatedId, name }) => (
            <Link
              key={relatedId}
              href={Route.project.detail({ lang, id: relatedId })}
              className="border-border-T10 bg-surface-T40/60 hover:border-primary-T10/40 hover:bg-surface-T40 group flex flex-col gap-3 rounded-[24px] border p-4 transition-all hover:-translate-y-0.5 md:p-5"
            >
              <p className="text-primary-T10 group-hover:text-primary-T20 text-lg transition-colors">
                {name}
              </p>
              <p className="text-text-T30 text-sm">
                {dict.project.openCaseStudy}
              </p>
            </Link>
          ))}
        </Paragraph>
      )}

      {project.demos.length > 0 && (
        <Paragraph
          id={ProjectParagraph.Demo}
          title={paragraphLabels[ProjectParagraph.Demo]}
        >
          {project.demos.map(({ mediaURL, content }) => (
            <li
              key={content}
              className="flex w-full flex-col gap-3"
            >
              <div className="mx-auto w-full overflow-hidden rounded-3xl md:w-1/2">
                <ZoomableImage
                  src={mediaURL}
                  className={getShowcaseClassName()}
                  imageClassName="aspect-[16/10] max-h-[32rem] bg-surface-T10 object-cover"
                  width={1200}
                  height={750}
                  alt={content}
                />
              </div>
              <p className="text-text-T20 mx-auto w-full text-center">
                {content}
              </p>
            </li>
          ))}
        </Paragraph>
      )}

      <Paragraph
        id={ProjectParagraph.Problem}
        title={paragraphLabels[ProjectParagraph.Problem]}
      >
        <InfoList list={problems} />
      </Paragraph>

      <Paragraph
        id={ProjectParagraph.Solution}
        title={paragraphLabels[ProjectParagraph.Solution]}
      >
        <InfoList list={solution} />
        <ul className="flex flex-col gap-5 md:gap-6">
          {architecture.diagrams.map(
            ({ title, caption, explanation, sources }) => (
              <li
                key={caption}
                className="border-border-T10 bg-surface-T40/55 relative flex w-full flex-col gap-5 overflow-hidden rounded-[28px] border p-4 shadow-(--shadow-panel) md:p-6"
              >
                <div className="from-primary-T10/12 pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent" />

                <div className="flex flex-col items-center gap-3 text-center">
                  {title && (
                    <h4 className="text-primary-T10 max-w-3xl text-xl md:text-2xl">
                      {title}
                    </h4>
                  )}
                  <p className="text-text-T20 max-w-3xl text-sm leading-7 md:text-base">
                    {caption}
                  </p>
                </div>

                {sources.image && (
                  <div className="border-border-T10 bg-surface-T50/80 mx-auto w-full overflow-hidden rounded-[24px] border p-2 md:w-[min(100%,52rem)] md:p-3">
                    <ZoomableImage
                      src={sources.image}
                      className="w-full"
                      imageClassName="aspect-[16/10] max-h-[32rem] rounded-[18px] bg-surface-T10 object-cover"
                      width={1200}
                      height={750}
                      alt={caption}
                    />
                  </div>
                )}
                {sources.mermaid && (
                  <div className="border-border-T10 bg-surface-T50/70 mx-auto w-full rounded-[24px] border p-3 md:w-[min(100%,56rem)] md:p-4">
                    <Mermaid
                      theme="neutral"
                      chart={sources.mermaid}
                    />
                  </div>
                )}

                {explanation && (
                  <div className="flex w-full flex-col gap-3 rounded-[22px] px-4 py-4 text-left md:px-6">
                    {explanation.map((text, index) => (
                      <p
                        key={text}
                        className="text-text-T20 text-sm leading-7 md:text-base"
                      >
                        <span className="text-primary-T20 mr-2 inline-block font-medium">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      </Paragraph>

      <Paragraph
        id={ProjectParagraph.Impact}
        title={paragraphLabels[ProjectParagraph.Impact]}
      >
        <InfoList list={impacts} />
      </Paragraph>
    </AsidePage>
  );
};

export default Page;
