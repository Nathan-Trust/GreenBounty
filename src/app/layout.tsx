import { LayoutProps } from "@/models/shared";

const RootLayout = ({ children }: LayoutProps) => {
  return <div className=" min-h-screen ">{children}</div>;
};

export default RootLayout;
