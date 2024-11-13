import {
  JoinWaitlistSchema,
  JoinWaitlistSchemaType,
} from "@/schema/join-waitlist";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { AuthService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import LoadingDots from "@/components/shared/LoadingDots";
import vector from "../../../assets/landing-page/Vector 13.svg";
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";

const JoinWaitListForm = () => {
  const form = useForm<z.infer<typeof JoinWaitlistSchema>>({
    resolver: zodResolver(JoinWaitlistSchema), // Use the modified schema
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.joinWaitlist,
    mutationKey: ["join-waitlist"],
  });

  const onSubmit = async (data: JoinWaitlistSchemaType) => {
    try {
      await mutateAsync(data);
      successToast({
        title: "Success!",
        message: "You have been added to the waitlist!",
      });
    } catch (error) {
      errorToast({
        title: "Error",
        message:
          (error as ApiError)?.response?.data?.message ??
          "Failed to add you to the waitlist. Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-10 flex-1 md:w-[500px] mx-auto  relative"
      >
        <div className="w-full flex justify-end">
          <img
            src={vector}
            alt="vector"
            className="ms-auto  w-28 md:w-24 -top-12 md:-top-8 -rotate-12 lg:rotate-0  lg:w-32 absolute lg:-right-16 lg:-top-12"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col md:flex-row w-full items-center gap-4  mt-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    aria-label="Email Address"
                    className="w-full" // Make input full width
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="w-full md:w-fit flex items-center justify-center"
            disabled={!form.formState.isValid || isPending}
          >
            {isPending ? <LoadingDots /> : "Join WaitList"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const JoinWaitList = () => {
  return (
    <div className="">
      <div className="screen-max-width px-4 py-16 gap-4">
        <div className="lg:w-1/2 mx-auto text-center">
          <p className="text-4xl lg:text-5xl font-semibold">
            Get Ahead in the <span className="text-primary">Green</span>{" "}
            Movement.
          </p>
          <p className="text-lg mt-2.5">
            Join our waitlist today for exclusive access to our recycling
            services, early updates, and personalized eco-tips to start making a
            difference.
          </p>
        </div>

        <JoinWaitListForm />
      </div>
    </div>
  );
};

export default JoinWaitList;
