import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestaurantFormScema, restaurantFormSchema } from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormScema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [error , setError] = useState<Partial<RestaurantFormScema>>({});
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value , type } = e.target;
    setInput({ ...input, [name]:type === 'number' ? Number(value) :  value });
  };
  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const result = restaurantFormSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial <RestaurantFormScema>);
    }

    console.log(input);
  }
  const loading = false;
  const restaurant = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  type="text"
                  name="restaurantName"
                  placeholder="Enter your restaurant name"
                />
                {
                  error && <span className="text-red-500 text-xs font-medium">{error.restaurantName}</span>
                }
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={input.city}
                  onChange={changeEventHandler}
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                />
                 {
                  error && <span className="text-red-500 text-xs font-medium">{error.city}</span>
                }
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={input.country}
                  onChange={changeEventHandler}
                  type="text"
                  name="country"
                  placeholder="Enter your country name"
                />
                 {
                  error && <span className="text-red-500 text-xs font-medium">{error.country}</span>
                }
              </div>
              <div>
                <Label>Estimate Delivery Time Name</Label>
                <Input
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  type="number"
                  name="deliveryTime"
                  placeholder="Enter your delivery time"
                />
                 {
                  error && <span className="text-red-500 text-xs font-medium">{error.deliveryTime}</span>
                }
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  value={input.cuisines}
                  onChange={(e)=>setInput({...input ,cuisines:e.target.value.split(",")})}
                  type="text"
                  name="cuisines"
                  placeholder="e.g. Momos , Biryani"
                />
                 {
                  error && <span className="text-red-500 text-xs font-medium">{error.cuisines}</span>
                }
              </div>
              <div>
                <Label>Upload Restaurant Image</Label>
                <Input
                  
                  onChange={(e) => setInput({...input , imageFile:e.target.files?.[0] || undefined})}
                  type="file"
                  accept="image/*"
                  name="imageFile"
                />
                 {
                  error && <span className="text-red-500 text-xs font-medium">{error.imageFile?.name || "Image file is required"}</span>
                }
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange ">
                  <Loader2 className="mr-2 h-4 w-4  animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange ">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
