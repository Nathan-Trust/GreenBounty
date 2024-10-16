import { Green_Bounty_Routes } from "@/store/route";
import useMetaTagUpdater, { useTitleUpdater } from "@/utils/meta";
import HomeClient from "./client";

const Home = () => {
  // SEO MANAGEMENT
  useTitleUpdater({ [Green_Bounty_Routes.home]: "GreenBounty" });
  useMetaTagUpdater({
    [Green_Bounty_Routes.home]: [
      { name: "description", content: "This is the login page description." },
      { name: "keywords", content: "login, authentication, user" },
    ],
  });
  return (
    <div>
      <HomeClient />
    </div>
  );
};

export default Home;
