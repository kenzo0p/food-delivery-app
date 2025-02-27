import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { MenuItem } from "@/types/restaurantTypes";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Manus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((singleMenu: MenuItem) => (
          <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img
              src={singleMenu.image}
              alt=""
              className="object-cover w-full h-40"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {singleMenu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {singleMenu.description}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Price:{" "}
                <span className="text-[#D19254]">{singleMenu.price}₹</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(singleMenu);
                  navigate("/cart");
                }}
                className="bg-orange w-full hover:bg-hoverOrange"
              >
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
