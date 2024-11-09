import { Truck } from "lucide-react";
import StatusCard from "../shared/CustomStatusCard";
import Pickup from "./pickup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";

const MyProfilePickup = () => {
  return (
    <Card className="shadow-none border-none outline-none">
      <CardHeader className="p-0 pb-6 md:p-6">
        <CardTitle>Pickup Information</CardTitle>
        <CardDescription>Monitor your recycables</CardDescription>
      </CardHeader>
      <CardContent className="p-0  md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <StatusCard
            title="Pickup Status"
            status="Pending"
            icon={<Truck />}
            borderColor="#548235"
            gradientColors={["#548235", "#121C0B"]}
          />
          <StatusCard
            title="Rank"
            status={
              <Badge className="text-sm bg-white hover:bg-white text-primary rounded-md font-medium mt-0.5">
                Plastic Bounty Hunter
              </Badge>
            }
            // icon={<Truck />}
            borderColor="#548235"
            gradientColors={["#548235", "#121C0B"]}
          />
        </div>
        <Pickup />
      </CardContent>
    </Card>
  );
};

export default MyProfilePickup;
