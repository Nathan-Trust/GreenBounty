import { Separator } from "@/components/ui/separator";
import whatsapp from "../../../assets/logo/logos_whatsapp-icon.png";
import facebook from "../../../assets/logo/logos_facebook.png";
import linkedin from "../../../assets/logo/skill-icons_linkedin.png";
import instagram from "../../../assets/logo/skill-icons_instagram.png";

const ShareRewards = () => {
  return (
    <div className="text-center">
      <h3>Share</h3>
      <Separator />
      <div className="my-4">
        <p>Direct sharing isn’t available yet.</p>
        <p>
          We&apos;re working on it! Soon, you&apos;ll be able to share the rewards of your
          bounty and spread the excitement of your achievements.
        </p>
      </div>
      <Separator />

      {/* Social media logos */}
      <div className="flex mt-4 justify-between px-4">
        <img src={whatsapp} alt="WhatsApp" className="w-10" />
        <img src={facebook} alt="Facebook" className="w-10" />
        <img src={linkedin} alt="LinkedIn" className="w-10" />
        <img src={instagram} alt="Instagram" className="w-10" />
      </div>
    </div>
  );
};

export default ShareRewards;
