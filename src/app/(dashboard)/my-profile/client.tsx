import { useEffect, useState } from "react";
import MyProfileDetails from "@/components/myprofile/MyProfileDetails";
import MyProfilePickup from "@/components/myprofile/MyProfilePickup";
import Wallet from "@/components/myprofile/wallet";
import Tabs from "@/components/shared/CustomTabs";
import { MyProfilePageType } from "@/models/myprofile";
import { myProfileTabItems } from "@/store/myprofile";
import { Green_Bounty_Routes } from "@/store/route";
import { ReactNode } from "react";
import MyProfilePassword from "@/components/myprofile/MyProfilePassword";

interface MyProfileClientProps {
  tab: MyProfilePageType;
}

const MyProfileClient = ({ tab }: MyProfileClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Define mapping of tabs to their respective indices
  const tabMapping: Record<MyProfilePageType, number> = {
    mypickup: 0,
    profile: 1,
    wallet: 2,
    password: 3, // Add new tab here if needed. Ensure to update tabMapping as well.
  };

  useEffect(() => {
    // Set active index based on tab prop
    setActiveIndex(tabMapping[tab]);
  }, [tab]);

  const renderSettingsTab = (
    <Tabs
      labels={myProfileTabItems}
      links={[
        Green_Bounty_Routes.myProfile("mypickup"),
        Green_Bounty_Routes.myProfile("profile"),
        Green_Bounty_Routes.myProfile("wallet"),
        Green_Bounty_Routes.myProfile("password"), 
      ]}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex} // Pass setActiveIndex for Tabs to handle clicks
    />
  );

  const renderTabs: Record<MyProfilePageType, ReactNode> = {
    mypickup: <MyProfilePickup />,
    profile: <MyProfileDetails />,
    wallet: <Wallet />,
    password: <MyProfilePassword/>
  };

  return (
    <div className="p-3 mini-md:p-6 max-w-screen-lg mx-auto gap-4 mini-md:gap-6">
      <div className="flex space-x-4 mb-6">{renderSettingsTab}</div>
      <div className="mb-10">{renderTabs[tab]}</div>
    </div>
  );
};

export default MyProfileClient;
