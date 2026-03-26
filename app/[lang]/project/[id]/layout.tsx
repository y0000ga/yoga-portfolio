import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { getProjectById } from "@/libs/content";
import { createPageMetadata } from "@/libs/site";
import { Lang } from "@/types/common";

interface ProjectLayoutProps {
  params: Promise<{
    id: string;
    lang: Lang;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProjectLayoutProps): Promise<Metadata> => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return createPageMetadata({
      title: "找不到作品 | yoga.dev",
      description: "此作品不存在，或已從作品集中移除。",
      path: `/project/${id}`,
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.intro,
    path: `/project/${id}`,
  });
};

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-4 md:gap-8">{children}</div>;
};

export default Layout;
