import React from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useRestaurantStore } from "@/store/useRestaurantStore";
export type IFilterOtionsState = {
  id: string;
  label: string;
};
// agar applied filter ke andar wo exist karata hain to wo checked hain
const filterOptions: IFilterOtionsState[] = [
  {
    id: "burger",
    label: "Burger",
  },
  {
    id: "thali",
    label: "Thali",
  },
  {
    id: "biryani",
    label: "Biryani",
  },
  {
    id: "momos",
    label: "Momos",
  },
];

const FilterPage = () => {
  const { setAppliedFilter , appliedFilter , resetAppliedFilter } = useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    // console.log(value);
    setAppliedFilter(value);
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button onClick={resetAppliedFilter} variant={"link"}>Reset</Button>
      </div>
      <div>
        {filterOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2 my-2">
            <Checkbox
            checked={appliedFilter.includes(option.label)}
              id={option.id}
              onClick={() => appliedFilterHandler(option.label)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
