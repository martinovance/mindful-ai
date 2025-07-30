import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validationSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CreateUserAccount } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { showToast } from "@/shared/Toast";
import { AuthTypes, DialogOpen } from "@/types/auth";

const CreateAccount = ({ setIsLoginOpen, setIsSignupOpen }: DialogOpen) => {
  const { mutate: CreateUser, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }: AuthTypes) =>
      CreateUserAccount({ fullName, email, password }),
    onSuccess: () => {
      showToast({
        title: "Success!",
        description: "Account created successfully.",
        status: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      showToast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
      });
    },
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    const { fullName, email, password } = values;
    CreateUser({ fullName, email, password });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className="bg-[#F0F2F5] rounded-xl border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="bg-[#F0F2F5] rounded-xl border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    className="bg-[#F0F2F5] rounded-xl border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    {...field}
                    type="password"
                    className="bg-[#F0F2F5] rounded-xl border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#0D80F2] text-[#fff] font-bold rounded-full hover:text-white 
            cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="font-medium text-sm text-center mt-1">
            Already have an account? {""}
            <span
              onClick={() => {
                setIsLoginOpen(true);
                setIsSignupOpen(false);
              }}
              className="text-blue-700 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default CreateAccount;
