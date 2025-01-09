import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// type LoginInputState = {
//   email: string;
//   password: string;
// };

export const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors , setErrors]  =useState<Partial<LoginInputState>>({}); 
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);

    setInput({
        email:"",
        password:""
    })
  };
  const loading = false;
  return (
    <div className="flex items-center text-start justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md  md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-center text-2xl">OmEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            {/* <Label className="ml-[-183px]">Enter the email</Label> */}
            <Input
              name="email"
              type="email"
              placeholder="Enter Your email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            {/* <Label className="ml-[-180px]">Enter the password</Label> */}
            <Input
              name="password"
              type="password"
              placeholder="Enter Your password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button
              disabled
              type="submit"
              className="bg-orange hover:bg-hoverOrange w-full border-none"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange hover:bg-hoverOrange w-full border-none"
            >
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link to="/forgot-password" className="hover:text-blue-500 hover:underline">Forgot Password</Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline text-blue-600">
            Create an account.
          </Link>
        </p>
        <p></p>
      </form>
    </div>
  );
};
