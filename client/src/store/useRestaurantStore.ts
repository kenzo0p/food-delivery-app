import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MenuItem = {
  _id:string;
  name:string;
  description:string;
  price:number;
  image:string;

}


type Restaurant = {
  _id:string;
  user:string;
  restaurantName:string;
  city:string;
  country:string;
  deliveryTime:number;
}
type RestaurantState = {
  loading : boolean;
  restaurant : null;
  searchedRestaurant:null;
  createRestaurant:(formData:FormData) => Promise<void>;
  getRestaurant:() => Promise<void>;
  updateRestaurant:(formData : FormData) => Promise<void>;
  searchRestaurant:(searchText:string , searchQuery : string , selectedCuisines:any) => Promise<void>;
  addMenuToRestaurant:(menu:MenuItem) => void
  updateMenuToRestaurant:(menu:any) => void;
}

const API_ENDPOINT = import.meta.env.VITE_RESTAURANT_ENDPOINT;
axios.defaults.withCredentials = true;
if (!API_ENDPOINT) {
  throw new Error("RESTAURANT_ENDPOINT environment variable is not defined");
}

// type RestaurantState = {
//     loading :boolean,
//     restaurant:null,
//     restaurantResult:null,

// }

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,

      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines);
          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString()}`
          );
          if (response.data.success) {
            console.log(response.data);
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error: any) {
          set({ loading: false });
        }
      },
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
        });
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
