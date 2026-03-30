import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-4 md:gap-8">{children}</div>;
};

export default Layout;
