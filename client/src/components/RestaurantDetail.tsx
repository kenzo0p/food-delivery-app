import { Timer } from "lucide-react";
import { Badge } from "./ui/badge";
import AvailableMenu from "./AvailableMenu";

const RestaurantDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full ">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src="https://static.vecteezy.com/system/resources/previews/028/882/814/non_2x/pizza-pizza-transparent-pizza-ai-generated-free-png.png"
            alt="image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">{"Special veg Hotel"}</h1>
            <div className="flex gap-2 my-2 ">
              {["Biryani", "Paneer", "Rayata"].map(
                (cuisine: string, index: number) => (
                  <Badge key={index}>{cuisine}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5 ">
              <div className="flex items-center gap-2 ">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]">35 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <AvailableMenu />
      </div>
    </div>
  );
};

export default RestaurantDetail;
