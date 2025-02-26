import { Loader2, Mail, MapPin, MapPinHouse, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { FormEvent, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { user, updateProfile } = useUserStore();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    user?.profilePicture || ""
  );
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(profileData)
    try {
      setIsloading(true);
      await updateProfile(profileData);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>CN</AvatarFallback>
            <Input
              ref={imageRef}
              accept="image/*"
              onChange={fileChangeHandler}
              className="hidden"
              type="file"
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            value={profileData.fullname}
            onChange={changeHandler}
            type="text"
            name="fullname"
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              disabled
              type="email"
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none w-full "
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none w-full "
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none w-full "
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none w-full "
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        {isLoading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange ">
            <Loader2 className="animate-spin mr-2 w-4 h-4" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="bg-orange hover:bg-hoverOrange ">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
