import { PropsWithChildren } from "react";
import { IBasePageProps } from "@/types/common";


const Layout = ({ children }: PropsWithChildren<IBasePageProps>) => {
  return <div className="flex gap-4 md:gap-8">{children}</div>;
};

export default Layout;
