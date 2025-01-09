import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { PhoneOutgoing, Loader2, LockKeyhole, Mail,  User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";



export const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname:"",
    email: "",
    password: "",
    contact:"",
  });
  const [errors , setErrors] = useState<Partial<SignupInputState>>({})
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const signupSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // form validation check
    const result = userSignupSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    // login api implementation
    console.log(input);

    setInput({
        email:"",
        password:"",
        contact:"",
        fullname:""
    })
  };
  const loading = false;
  return (
    <div className="flex items-center text-start justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full  max-w-md  md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">OmEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            {/* <Label className="ml-[-183px]">Enter the email</Label> */}
            <Input
              name="fullname"
              type="text"
              placeholder="Enter Your Full name"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            {/* <Label className="ml-[-180px]">Enter the password</Label> */}
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email"
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
        <div className="mb-4">
          <div className="relative">
            {/* <Label className="ml-[-180px]">Enter the password</Label> */}
            <Input
              name="contact"
              type="text"
              placeholder="Enter Your Contact No"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
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
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login.
          </Link>
        </p>
        <p></p>
      </form>
    </div>
  );
};
