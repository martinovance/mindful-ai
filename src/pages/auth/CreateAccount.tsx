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
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CreateUserAccount } from "@/services/authService";
import { Loader2 } from "lucide-react";
// import Auth from "@/utils/auth";

const CreateAccount = () => {
  const navigate = useNavigate();

  const { mutate: CreateUser, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      CreateUserAccount(email, password),
    onSuccess: () => {
      // Auth.setToken(data?.idToken);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    const { email, password } = values;
    CreateUser({ email, password });
  };

  return (
    <section className="flex flex-col justify-center items-center mt-10 gap-5">
      <p className="text-2xl font-bold">Create Account</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[500px] px-4 md:px-0"
        >
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
            className="w-full bg-[#B2C9E5] text-[#121417] font-bold rounded-full hover:text-white 
            cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="font-medium text-sm mt-1">
            Already have an account? {""}
            <Link to="/login" className="text-blue-700 cursor-pointer">
              Login
            </Link>{" "}
            instead.
          </p>
        </form>
      </Form>
    </section>
  );
};

export default CreateAccount;
