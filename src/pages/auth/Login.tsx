import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginUserCredentials } from "@/services/authService";
import { toast } from "sonner";

const CreateAccount = () => {
  const navigate = useNavigate();

  const LoginUser = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LoginUserCredentials(email, password),
    onSuccess: (data) => {
      console.log(data);
      // Auth.setToken(data?.idToken);
      toast("Login sucessful");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast("Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    LoginUser.mutate({ email, password });
  };

  return (
    <section className="flex flex-col justify-center items-center mt-10 gap-5">
      <p className="text-2xl font-bold">Login</p>
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

          <Button
            type="submit"
            className="w-full bg-[#B2C9E5] text-[#121417] font-bold rounded-full hover:text-white 
            cursor-pointer"
          >
            Login
          </Button>
          <p className="font-medium text-sm mt-1">
            You don't have an account? {""}
            <Link to="/create-account" className="text-blue-700 cursor-pointer">
              Sign up
            </Link>{" "}
            now.
          </p>
        </form>
      </Form>
    </section>
  );
};

export default CreateAccount;
