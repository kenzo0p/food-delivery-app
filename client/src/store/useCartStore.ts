import { CartState } from "@/types/cartTypes";
import { MenuItem } from "@/types/restaurantTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: MenuItem) => {
        set((state) => {
          // already added in cart then increase the quantity
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            // add cart
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      incrementquantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },
      decrementquantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
