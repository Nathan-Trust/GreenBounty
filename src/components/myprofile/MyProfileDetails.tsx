import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MyProfileFormSchema } from "@/schema/myprofile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Constants } from "@/utils/constants";
import { useStore } from "@/store/user";
import { Camera } from "lucide-react";
import { useUpdateUser } from "@/hooks/updateUser";
import { logger } from "@/utils/logger";

const MyProfileDetails = () => {
  const { userData } = useStore();

  const [profilePhoto, setProfilePhoto] = useState(
    userData?.profilePhoto ?? Constants.defaultAvatar
  );

  const form = useForm<z.infer<typeof MyProfileFormSchema>>({
    resolver: zodResolver(MyProfileFormSchema),
    defaultValues: {
      name: userData?.name ?? "",
    },
  });

  const referralCode = userData?.referralCode ?? "";
  const [isNameEditable, setIsNameEditable] = useState(false);

  // Use the custom hook to update user details
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);
      form.setValue("photo", photoURL); // Sync form state
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

    const handleDiscardChanges = () => {
      // Reset the form to its default values
      form.reset({
        name: userData?.name ?? "",
        photo: userData?.profilePhoto ?? Constants.defaultAvatar, // Reset photo to its original value
      });
      setProfilePhoto(userData?.profilePhoto ?? Constants.defaultAvatar); // Reset photo in the state
    };


  const onSubmit = async (values: z.infer<typeof MyProfileFormSchema>) => {
    try {
      await updateUser(values);
    } catch (err) {
      logger("Error updating user details", err);
    }
  };

  return (
    <Card className="shadow-none border-none outline-none">
      <CardHeader className="p-0 pb-6 md:p-6">
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Edit your information</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative w-fit h-fit">
              <Avatar className="w-24 h-24 border-2">
                <AvatarImage src={profilePhoto} alt="Profile Photo" />
              </Avatar>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profilePhoto"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="profilePhoto"
                className="absolute border bg-white flex items-center justify-center w-8 rounded-full right-1 h-8 p-2 -bottom-1 transform "
              >
                <Camera />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-3 items-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          readOnly={!isNameEditable}
                          className="pr-16"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => setIsNameEditable((prev) => !prev)}
                        variant="outline"
                        size="sm"
                        className="absolute right-1 h-8 top-1/2 transform -translate-y-1/2"
                      >
                        {isNameEditable ? "Lock" : "Edit"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2 mt-1">
                <p className="text-sm font-medium">Email</p>
                <Input placeholder="Email" readOnly value={userData?.email} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Referral Code</p>
              <div className="relative">
                <Input
                  placeholder="Referral Code"
                  value={referralCode}
                  readOnly
                  className="pr-16"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleCopyCode}
                  className="absolute right-1 h-8 top-1/2 transform -translate-y-1/2"
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <Button
                type="button"
                onClick={handleDiscardChanges}
                className="bg-[#E9E8E9] w-1/2 hover:bg-[#E9E8E9] text-black"
              >
                Discard Changes
              </Button>
              <Button type="submit" className="w-1/2" disabled={isPending}>
                {isPending ? "Updating..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MyProfileDetails;
