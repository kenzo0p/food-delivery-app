import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg  items-center justify-center gap-20 m-4">
      <div className="flex flex-col gap-20 md:w[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime and anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our delicious food is waiting for you, we are always neR TO YOU
          </p>
        </div>
        <div className="relative flex items-center gap-2 ">
          <Input
            type="text"
            placeholder="Search restaurant by name, city & country"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-10  shadow-lg"
          
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2 pointer-events-none" />
          <Button onClick={() => navigate(`/search/${searchText}`) } className="bg-orange hover:bg-hoverOrange">Search</Button>
        </div>
      </div>
      <div>
        <img src="https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-modern-kitchen-food-boxed-cheese-lunch-pizza-png-image_6651523.png" alt="pizza" className="object-cover w-full max-h-[500px]"/>
      </div>
    </div>
  );
};

export default HeroSection;
