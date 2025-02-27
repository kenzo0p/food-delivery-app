import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { icons, Minus, Plus } from "lucide-react";
import CheckoutConfirmPage from "./CheckoutConfirmPage,";
import { useCartStore } from "@/store/useCartStore";
import { MenuItem } from "@/types/restaurantTypes";
import { CartItem, CartState } from "@/types/cartTypes";
import { Item } from "@radix-ui/react-menubar";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, removeFromTheCart, incrementquantity, decrementquantity } =
    useCartStore();
  let totalAmount = cart.reduce((acc, elem) => {
    return acc + elem.price * elem.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant={"link"}>Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>PI</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit rounded-full flex item-center border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementquantity(item._id)}
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-gray-200"
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    variant={"outline"}
                    size={"icon"}
                    className="border-none font-bold rounded-full"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementquantity(item._id)}
                    variant={"outline"}
                    size={"icon"}
                    className="font-bold rounded-full bg-orange hover:bg-hoverOrange"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity} ₹</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => removeFromTheCart(item._id)} size={"sm"} className="bg-orange hover:bg-hoverOrange ">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount} ₹</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
