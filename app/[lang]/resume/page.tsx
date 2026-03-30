import type { Metadata } from "next";
import Image from "next/image";
import dayjs from "dayjs";
import { ElementType } from "react";
import { notFound } from "next/navigation";
import { EnvelopeIcon, HomeIcon } from "@heroicons/react/24/solid";
import Paragraph from "@/components/UI/Paragraph";
import { IconInfo, InfoList, ListItem, LocationPeriod } from "@/components/UI/Content";
import HighlightText from "@/components/UI/HighLightText";
import { GithubIcon, LinkedInIcon } from "@/components/UI/Icon";
import { AsidePage } from "@/components/UI/Page";
import { Tags } from "@/components/UI/Tag";
import { LINKS } from "@/constants/common";
import { RESUME_PARAGRAPH } from "@/constants/resume";
import { getResumeDetail } from "@/libs/content";
import { ResumeParagraph } from "@/types/resume";
import { createPageMetadata } from "@/libs/site";

const PARAGRAPHS = [
  ResumeParagraph.Experince,
  ResumeParagraph.Achievement,
  ResumeParagraph.Skill,
  ResumeParagraph.Education,
].map((id) => ({ id, title: RESUME_PARAGRAPH[id] }));

export const generateMetadata = async (): Promise<Metadata> => {

  return createPageMetadata({
  title: "履歷",
  description: "前端工程師履歷，整理工作經歷、成果、技能與學歷。",
  })
};

const Page = async () => {
  const res = await getResumeDetail();

  if (!res) {
    notFound();
  }

  const {
    workExperince,
    achievement,
    intro,
    education,
    email,
    skill,
    keywords
  } = res;

  return (
    <AsidePage navs={PARAGRAPHS}>
      <section className="grid w-full gap-5 rounded-4xl border border-border-T10 bg-surface-T50/80 p-5 shadow-[var(--shadow-panel)] backdrop-blur md:p-7 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-[28px] border border-border-T10 bg-surface-T40 md:mx-0 md:w-52">
          <Image
            src="/picture_me.jpg"
            alt="Profile photo"
            fill
            className="object-cover object-[50%_20%]"
            priority
            sizes="1"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <div className="space-y-3">
            <h1 className="text-[36px] leading-none md:text-[72px]">
              <span className="text-primary-T10">黃</span>于家
            </h1>
            <h2 className="text-[18px] font-semibold text-text-T20 md:text-[32px]">
              {keywords.join(' | ')}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {LINKS.map(({ url, type }) => {
              let icon: ElementType | null = null;
              switch (type.toLocaleLowerCase()) {
                case "github":
                  icon = GithubIcon;
                  break;
                case "linkedin":
                  icon = LinkedInIcon;
                  break;
                default:
                  break;
              }
              return icon ? <IconInfo icon={icon} key={url} url={url} /> : null;
            })}
            <IconInfo icon={HomeIcon}>
              <p className="text-md leading-none">台北</p>
            </IconInfo>
            <IconInfo icon={EnvelopeIcon}>
              <a className="text-md leading-none" href={`mailto:${email}`}>{email}</a>
            </IconInfo>
          </div>

          <div className="rounded-[28px] border border-border-T10 bg-surface-T40/60 p-4 md:p-5">
            <div className="text-text-T20">
              <HighlightText text={intro} />
            </div>
          </div>
        </div>
      </section>
      <Paragraph title={RESUME_PARAGRAPH[ResumeParagraph.Experince]} id={ResumeParagraph.Experince}>
        {workExperince.list.map(({ title, company, startFrom, endAt, contents }) => (
          <ListItem key={company} title={title}>
            <LocationPeriod
              location={company}
              startFrom={dayjs(startFrom).format("YYYY/MM")}
              endAt={dayjs(endAt).format("YYYY/MM")}
            />
            <InfoList list={contents} />
          </ListItem>
        ))}
      </Paragraph>

      <Paragraph title={RESUME_PARAGRAPH[ResumeParagraph.Achievement]} id={ResumeParagraph.Achievement}>
        {achievement.list.map(({ title, intro: achievementIntro, techStack, results, links }) => (
          <ListItem title={title} key={title}>
            <p><HighlightText text={achievementIntro} /></p>
            <h5>成果</h5>
            <InfoList list={results} />
            <h5>技術</h5>
            <Tags list={techStack} />
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {links.map(({ label, value }) => (
                  <a
                    key={`${label}-${value}`}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border-T10 bg-surface-T50 px-3 py-1.5 text-sm text-text-T20 transition-all hover:border-primary-T10/50 hover:text-primary-T10"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </ListItem>
        ))}
      </Paragraph>

      <Paragraph title={RESUME_PARAGRAPH[ResumeParagraph.Skill]} id={ResumeParagraph.Skill}>
        {skill.list.map(({ title, content, techStack }) => (
          <ListItem title={title} key={title}>
            <Tags list={techStack} />
            <p>{content}</p>
          </ListItem>
        ))}
      </Paragraph>

      <Paragraph title={RESUME_PARAGRAPH[ResumeParagraph.Education]} id={ResumeParagraph.Education}>
        {education.list.map(({ school, department, startFrom, endAt, topic }) => (
          <ListItem title={school} key={school}>
            <LocationPeriod
              location={department}
              startFrom={dayjs(startFrom).format("YYYY")}
              endAt={dayjs(endAt).format("YYYY")}
            />
            <p>{topic}</p>
          </ListItem>
        ))}
      </Paragraph>
    </AsidePage>
  );
};

export default Page;
