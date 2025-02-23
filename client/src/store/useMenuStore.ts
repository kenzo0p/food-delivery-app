import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_ENDPOINT = import.meta.env.VITE_RESTAURANT_MENU_ENDPOINT;
axios.defaults.withCredentials = true;
if (!API_ENDPOINT) {
  console.log("Menu_Endpoint environment variable is not defined");
}
type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};
export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update resto
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update resto menus
          useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
