import UserIdTable from "@/components/account/user/[user_id]/UserIdTable";
import UserIdTableEmptyState from "@/components/account/user/[user_id]/UserIdTableEmptyState";
import { UserIdTableSkeleton } from "@/components/account/user/[user_id]/UserIdTableSkeleton";
import CustomCard from "@/components/shared/CustomCard";
import { CustomCardContent } from "@/components/shared/CustomCardHeader";
import CustomTableFilterQuery from "@/components/shared/CustomTableFilterQuery";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardItems, sampleData } from "@/store/users";
import { camelCaseToSentenceCase } from "@/utils/text";
import { useParams } from "react-router-dom";

interface UserTitleProps {
  filteredData: {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    company?: string;
    role?: string;
    status?: string;
  };
}

const UserTitle = ({ filteredData }: UserTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <p>{filteredData?.name}</p>
        <Badge className="bg-lightGray text-dark hover:bg-lightGray rounded-sm ">
          Trial
        </Badge>
      </div>
      <div className="flex gap-4 h-7">
        <Button className="h-full rounded-sm">Edit</Button>
        <Button className="bg-lightGray border-lightGray_three hover:bg-lightGray border text-lightGray_three h-full rounded-sm">
          Deactivate
        </Button>
      </div>
    </div>
  );
};

const User = () => {
  const { _id } = useParams();
const isLoading = false
  const renderCardItems = () => {
    return cardItems.map((item) => (
      <CustomCard key={item.label} item={item} className="col-span-12 lg:col-span-4" />
    ));
  };

  const filteredData = sampleData.find(
    (user) => String(user.id) === String(_id)
  );

  return (
    <div className="w-full p-3 flex flex-col gap-3 h-fit">
      <CustomCardContent
        title={<UserTitle filteredData={filteredData!} />}
        description="List of all users"
        className="h-fit"
      >
        <div className="grid lg:grid-cols-5 w-full gap-6">
          {filteredData &&
            Object.keys(filteredData).map((key) => (
              <div key={key} className="flex flex-col ">
                <p className="font-semibold uppercase text-xs text-lightGray_three">
                  {key == "dob"
                    ? "Date of Birth"
                    : key == "phone"
                    ? "Phone Number"
                    : camelCaseToSentenceCase(key)}
                </p>
                <p className="text-sm font-medium mt-0.5">
                  {filteredData[key as keyof typeof filteredData]}
                </p>
              </div>
            ))}
        </div>
      </CustomCardContent>
      <div className="grid grid-cols-12 gap-3">{renderCardItems()}</div>
      <CustomCardContent
        title="Projects"
        description="List of all user's projects"
        className="h-fit"
      >
        <div>
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={<UserIdTableSkeleton length={5} />}
            emptyState={<UserIdTableEmptyState />}
            data={2}
          >
            <CustomTableFilterQuery />
            <UserIdTable />
          </FetchLoadingAndEmptyState>
        </div>
      </CustomCardContent>
    </div>
  );
};

export default User;
