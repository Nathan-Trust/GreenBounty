import MyProfileDetails from "@/components/myprofile/MyProfileDetails";
import MyProfilePickup from "@/components/myprofile/MyProfilePickup";
import Tabs from "@/components/shared/CustomTabs";
import { MyProfilePageType } from "@/models/myprofile";
import { myProfileTabItems } from "@/store/myprofile";
import { Green_Bounty_Routes } from "@/store/route";
import { ReactNode } from "react";


interface MyProfileClientProps {
  tab: MyProfilePageType;
}

const MyProfileClient = ({ tab }: MyProfileClientProps) => {
  const renderSettingsTab = (
    <Tabs
      labels={myProfileTabItems}
      links={[
        Green_Bounty_Routes.myProfile("mypickup"),
        Green_Bounty_Routes.myProfile("profile"),
      ]}
    />
  );

  const renderTabs: Record<MyProfilePageType, ReactNode> = {
    mypickup: <MyProfilePickup />,
    profile: <MyProfileDetails />,
  };

  return (
    <div className=" p-1.5 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6 ">
      <div className="flex space-x-4 mb-6">{renderSettingsTab}</div>
      <div className="mb-10">{renderTabs[tab]}</div>
    </div>
  );
};

export default MyProfileClient;
