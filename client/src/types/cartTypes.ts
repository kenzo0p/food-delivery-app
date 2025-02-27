import { MenuItem } from "./restaurantTypes";

export interface CartItem extends MenuItem {
    quantity : number;
}
export type CartState = {
    cart:CartItem[];
    addToCart : (item:MenuItem) => void;
    clearCart:() => void;
    removeFromTheCart : (id:string) => void;
    incrementquantity : (id:string) => void;
    decrementquantity : (id:string) => void;
}