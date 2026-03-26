import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { createPageMetadata } from "@/libs/site";
import { IBasePageProps } from "@/types/common";

export const metadata: Metadata = createPageMetadata({
  title: "作品集 | yoga.dev",
  description: "整理案例研究、產品型前端專案與 side project 的作品列表頁。",
  path: "/project",
});

const Layout = ({ children }: PropsWithChildren<IBasePageProps>) => children;

export default Layout;
