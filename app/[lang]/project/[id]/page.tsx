import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconInfo, InfoList, ListItem } from "@/components/UI/Content";
import HighlightText from "@/components/UI/HighLightText";
import { GithubIcon } from "@/components/UI/Icon";
import { AsidePage } from "@/components/UI/Page";
import Paragraph from "@/components/UI/Paragraph";
import ZoomableImage from "@/components/UI/ZoomableImage";
import { PROJECT_TYPE_NAME } from "@/constants/common";
import { PROJECT_PARAGRAPH } from "@/constants/project";
import { getProjectById } from "@/libs/content";
import { Project, ProjectParagraph } from "@/types/project";

interface IProjectPageProps {
  params: Promise<{
    id: string
    lang: string
  }>
}

export const generateMetadata = async ({ params }: IProjectPageProps): Promise<Metadata> => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "找不到作品 | yoga.dev",
    };
  }

  return {
    title: project.title,
    description: project.intro,
  };
};

const Page = async ({ params }: IProjectPageProps) => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const { type, title, problems, impacts, architecture, decisions, intro, tradeOffs } = project;

  const PARAGRAPHS = [
    ...(type === Project.CaseStudy ? [ProjectParagraph.Overview] : []),
    ProjectParagraph.Demo,
    ProjectParagraph.Problem,
    ...(type === Project.CaseStudy ? [ProjectParagraph.Challenge] : []),
    ProjectParagraph.Solution,
    ProjectParagraph.Decision,
    ProjectParagraph.TradeOff,
    ...(type === Project.CaseStudy ? [ProjectParagraph.Execution] : []),
    ProjectParagraph.Impact,
    ...(type === Project.CaseStudy ? [ProjectParagraph.Ownership] : []),
    ...(type === Project.SideProject ? [ProjectParagraph.FutureWorks] : []),
  ].map((id) => ({ id, title: PROJECT_PARAGRAPH[id] }));

  const getShowcaseClassName = () =>
    "mx-auto w-full md:w-1/2";

  return (
    <AsidePage navs={PARAGRAPHS}>
      <section className="grid w-full gap-5 rounded-4xl border border-border-T10 bg-surface-T50/80 p-5 shadow-(--shadow-panel) backdrop-blur md:p-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary-T10/25 bg-primary-T30 px-3 py-1 text-[12px] uppercase tracking-[0.16em] text-primary-T20">
              {PROJECT_TYPE_NAME[type]}
            </span>
            {type === Project.SideProject && <IconInfo icon={GithubIcon} url={project.repoURL} />}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl text-primary-T10 md:text-6xl">{title}</h1>
            <h4 className="max-w-3xl text-text-T20">{intro}</h4>
          </div>

          {type === Project.CaseStudy && (
            <div
              id={ProjectParagraph.Overview}
              className="grid gap-3 rounded-[28px] border border-border-T10 bg-surface-T40/60 p-4 md:grid-cols-3 md:p-5"
            >
              {[
                { label: "規模", value: project.context.scale },
                { label: "團隊", value: project.context.team },
                { label: "角色", value: project.context.role },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl border border-border-T10 bg-surface-T50 p-4">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-primary-T20">{label}</p>
                  <p className="mt-2 text-sm text-text-T20">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Paragraph
        id={ProjectParagraph.Demo}
        title={PROJECT_PARAGRAPH[ProjectParagraph.Demo]}
      >
        {project.demos.map(({ mediaURL, content }) => (
          <li key={content} className="flex w-full flex-col gap-3">
            <div className="mx-auto w-full md:w-1/2 overflow-hidden rounded-3xl">
              <ZoomableImage
                src={mediaURL}
                className={getShowcaseClassName()}
                imageClassName="aspect-[16/10] max-h-[32rem] bg-surface-T10 object-cover"
                width={1200}
                height={750}
                alt={content}
              />
            </div>
            <p className="mx-auto w-full text-text-T20">{content}</p>
          </li>
        ))}
      </Paragraph>

      <Paragraph
        id={ProjectParagraph.Problem}
        title={PROJECT_PARAGRAPH[ProjectParagraph.Problem]}
      >
        <InfoList list={problems} />
      </Paragraph>

      {type === Project.CaseStudy && (
        <Paragraph
          id={ProjectParagraph.Challenge}
          title={PROJECT_PARAGRAPH[ProjectParagraph.Challenge]}
        >
          <InfoList list={project.challenges} />
        </Paragraph>
      )}

      <Paragraph
        id={ProjectParagraph.Solution}
        title={PROJECT_PARAGRAPH[ProjectParagraph.Solution]}
      >
        <InfoList list={architecture.solutions} />
        <ul className="flex flex-col gap-3">
          {architecture.images.map(({ mediaURL, content }) => (
            <li key={content} className="flex w-full flex-col gap-3">
              <div className="mx-auto w-full md:w-1/2 overflow-hidden rounded-3xl">
                <ZoomableImage
                  src={mediaURL}
                  className={getShowcaseClassName()}
                  imageClassName="aspect-[16/10] max-h-[32rem] bg-surface-T10 object-cover"
                  width={1200}
                  height={750}
                  alt={content}
                />
              </div>
              <p className="mx-auto w-full text-center text-text-T20">{content}</p>
            </li>
          ))}
        </ul>
      </Paragraph>

      <Paragraph
        id={ProjectParagraph.Decision}
        title={PROJECT_PARAGRAPH[ProjectParagraph.Decision]}
      >
        {decisions.map(({ answer, question }) => (
          <ListItem key={question} title={question}>
            <HighlightText text={answer} />
          </ListItem>
        ))}
      </Paragraph>

      <Paragraph
        id={ProjectParagraph.TradeOff}
        title={PROJECT_PARAGRAPH[ProjectParagraph.TradeOff]}
      >
        <InfoList list={tradeOffs} />
      </Paragraph>

      {type === Project.CaseStudy && (
        <Paragraph
          id={ProjectParagraph.Execution}
          title={PROJECT_PARAGRAPH[ProjectParagraph.Execution]}
        >
          <InfoList list={project.execution} />
        </Paragraph>
      )}

      <Paragraph
        id={ProjectParagraph.Impact}
        title={PROJECT_PARAGRAPH[ProjectParagraph.Impact]}
      >
        <InfoList list={impacts} />
      </Paragraph>

      {type === Project.CaseStudy && (
        <Paragraph
          id={ProjectParagraph.Ownership}
          title={PROJECT_PARAGRAPH[ProjectParagraph.Ownership]}
        >
          <InfoList list={project.ownership} />
        </Paragraph>
      )}

      {type === Project.SideProject && (
        <Paragraph
          id={ProjectParagraph.FutureWorks}
          title={PROJECT_PARAGRAPH[ProjectParagraph.FutureWorks]}
        >
          <InfoList list={project.futureWorks} />
        </Paragraph>
      )}
    </AsidePage>
  );
};

export default Page;
