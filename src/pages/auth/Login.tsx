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
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginUserCredentials } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { showToast } from "@/shared/Toast";
import { DialogOpen } from "@/types/auth";

const Login = ({ setIsLoginOpen, setIsSignupOpen }: DialogOpen) => {
  const navigate = useNavigate();

  const { mutate: LoginUser, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LoginUserCredentials(email, password),
    onSuccess: () => {
      showToast({
        title: "Success!",
        description: "User signed in successfully.",
        status: "success",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Error here:", error);
      showToast({
        title: "Error",
        description: "Unable to sign user in, please try again",
        status: "error",
      });
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
    LoginUser({ email, password });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
            className="w-full bg-[#0D80F2] text-[#fff] font-bold rounded-full hover:text-white 
            cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>
          <p className="font-medium text-sm text-center mt-1">
            Don't have an account? {""}
            <span
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
              className="text-blue-700 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default Login;
