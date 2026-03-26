import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { createPageMetadata } from "@/libs/site";
import { IBasePageProps } from "@/types/common";

export const metadata: Metadata = createPageMetadata({
  title: "履歷 | yoga.dev",
  description: "前端工程師履歷頁，整理工作經歷、成就、技能與學歷。",
  path: "/resume",
});

const Layout = ({ children }: PropsWithChildren<IBasePageProps>) => {
  return <div className="flex gap-4 md:gap-8">{children}</div>;
};

export default Layout;
