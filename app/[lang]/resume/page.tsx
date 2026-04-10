import type { Metadata } from "next";
import Image from "next/image";
import dayjs from "dayjs";
import { ElementType } from "react";
import { notFound } from "next/navigation";
import { EnvelopeIcon, HomeIcon } from "@heroicons/react/24/solid";
import Paragraph from "@/components/UI/Paragraph";
import {
  IconInfo,
  InfoList,
  ListItem,
  LocationPeriod,
} from "@/components/UI/Content";
import HighlightText from "@/components/UI/HighLightText";
import { GithubIcon, LinkedInIcon } from "@/components/UI/Icon";
import { AsidePage } from "@/components/UI/Page";
import { Tags } from "@/components/UI/Tag";
import { LINKS } from "@/constants/common";
import { getResumeParagraphLabels } from "@/constants/resume";
import { getResumeDetail } from "@/libs/content";
import { getDictionary, hasLocale } from "@/libs/i18n";
import { createPageMetadata } from "@/libs/site";
import { IBasePageProps } from "@/types/common";
import { ResumeParagraph } from "@/types/resume";

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
    title: dict.resume.metadata.title,
    description: dict.resume.metadata.description,
    path: "/resume",
  });
};

const Page = async ({ params }: IBasePageProps) => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const paragraphLabels = getResumeParagraphLabels(lang);
  const res = await getResumeDetail();

  if (!res) {
    notFound();
  }

  const navs = [
    ResumeParagraph.Experince,
    ResumeParagraph.Achievement,
    ResumeParagraph.Skill,
    ResumeParagraph.Education,
  ].map((id) => ({ id, title: paragraphLabels[id] }));

  const {
    workExperince,
    achievement,
    intro,
    education,
    email,
    skill,
    keywords,
  } = res;

  return (
    <AsidePage navs={navs}>
      <section className="border-border-T10 bg-surface-T50/80 grid w-full gap-5 rounded-4xl border p-5 shadow-[var(--shadow-panel)] backdrop-blur md:p-7 lg:grid-cols-[auto_1fr]">
        <div className="border-border-T10 bg-surface-T40 relative mx-auto aspect-square w-40 overflow-hidden rounded-[28px] border md:mx-0 md:w-52">
          <Image
            src="/picture_me.jpg"
            alt={dict.site.profilePhotoAlt}
            fill
            className="object-cover object-[50%_20%]"
            priority
            sizes="1"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <div className="space-y-3">
            <h1 className="text-[36px] leading-none md:text-[72px]">
              <span className="text-primary-T10">Yu-Chia</span> Huang
            </h1>
            <h2 className="text-text-T20 text-[18px] font-semibold md:text-[32px]">
              {keywords.join(" | ")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
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
              return icon ? (
                <IconInfo
                  icon={icon}
                  key={url}
                  url={url}
                />
              ) : null;
            })}
            <IconInfo icon={HomeIcon}>
              <p className="text-md leading-none">
                {dict.resume.location}
              </p>
            </IconInfo>
            <IconInfo icon={EnvelopeIcon}>
              <a
                className="text-md leading-none"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </IconInfo>
          </div>

          <div className="border-border-T10 bg-surface-T40/60 rounded-[28px] border p-4 md:p-5">
            <div className="text-text-T20">
              <HighlightText text={intro} />
            </div>
          </div>
        </div>
      </section>
      <Paragraph
        title={paragraphLabels[ResumeParagraph.Experince]}
        id={ResumeParagraph.Experince}
      >
        {workExperince.list.map(
          ({ title, company, startFrom, endAt, contents }) => (
            <ListItem
              key={`${company}-${title}`}
              title={title}
            >
              <LocationPeriod
                location={company}
                startFrom={dayjs(startFrom).format("YYYY/MM")}
                endAt={dayjs(endAt).format("YYYY/MM")}
              />
              <InfoList list={contents} />
            </ListItem>
          ),
        )}
      </Paragraph>

      <Paragraph
        title={paragraphLabels[ResumeParagraph.Achievement]}
        id={ResumeParagraph.Achievement}
      >
        {achievement.list.map(
          ({
            title,
            intro: achievementIntro,
            techStack,
            results,
            links,
          }) => (
            <ListItem
              title={title}
              key={title}
            >
              <p>
                <HighlightText text={achievementIntro} />
              </p>
              <h5>{dict.common.results}</h5>
              <InfoList list={results} />
              <h5>{dict.common.techStack}</h5>
              <Tags list={techStack} />
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {links.map(({ label, value }) => (
                    <a
                      key={`${label}-${value}`}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border-T10 bg-surface-T50 text-text-T20 hover:border-primary-T10/50 hover:text-primary-T10 rounded-full border px-3 py-1.5 text-sm transition-all"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </ListItem>
          ),
        )}
      </Paragraph>

      <Paragraph
        title={paragraphLabels[ResumeParagraph.Skill]}
        id={ResumeParagraph.Skill}
      >
        {skill.list.map(({ title, content, techStack }) => (
          <ListItem
            title={title}
            key={title}
          >
            <Tags list={techStack} />
            <p>{content}</p>
          </ListItem>
        ))}
      </Paragraph>

      <Paragraph
        title={paragraphLabels[ResumeParagraph.Education]}
        id={ResumeParagraph.Education}
      >
        {education.list.map(
          ({ school, department, startFrom, endAt, topic }) => (
            <ListItem
              title={school}
              key={school}
            >
              <LocationPeriod
                location={department}
                startFrom={dayjs(startFrom).format("YYYY")}
                endAt={dayjs(endAt).format("YYYY")}
              />
              <p>{topic}</p>
            </ListItem>
          ),
        )}
      </Paragraph>
    </AsidePage>
  );
};

export default Page;
