import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // React Router for navigation
import MyProfileClient from "./client"; // Adjust path as necessary
import { MyProfilePageType } from "@/models/myprofile";
import { myProfileTabItems } from "@/store/myprofile";
import { Green_Bounty_Routes } from "@/store/route";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") as MyProfilePageType; // Get the `tab` parameter from the URL

  useEffect(() => {
    if (!myProfileTabItems.includes(tab)) {
      navigate(Green_Bounty_Routes.myProfile("mypickup"));
    }
  }, [tab, navigate]);

  return (
    <div>
      <MyProfileClient tab={tab} /> {/* Pass tab to the client component */}
    </div>
  );
};

export default MyProfile;
