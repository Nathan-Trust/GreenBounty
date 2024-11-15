import { Green_Bounty_Routes } from "@/store/route";
import HomeClient from "./client";
import { Helmet } from "react-helmet-async";

const Home = () => {


  return (
    <div id="home">
      <Helmet>
        <title>GreenBounty</title>
        <meta
          name="description"
          content="This is the green bounty landing page description."
        />
        <meta
          name="keywords"
          content="green bounty, bounty, rewards, rewards, earn"
        />
        <link rel="canonical" href={Green_Bounty_Routes.home} />
        {/* Additional meta tags can be added here */}
      </Helmet>
      <HomeClient />
    </div>
  );
};

export default Home;
