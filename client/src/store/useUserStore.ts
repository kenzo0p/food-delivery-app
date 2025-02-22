import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT;

if (!API_ENDPOINT) {
  throw new Error("USER_ENDPOINT environment variable is not defined");
}

axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Email verification failed"
          );
          set({ loading: false });
        }
      },
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_ENDPOINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          } else {
            set({ isAuthenticated: false, isCheckingAuth: false });
          }
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Logout failed");
          set({ loading: false });
        }
      },
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/forgot-password`, {
            email,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Password reset request failed"
          );
          set({ loading: false });
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/reset-password/${token}`,
            { newPassword }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          } else {
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Password reset failed");
          set({ loading: false });
        }
      },
      updateProfile: async (input: any) => {
        try {
          set({ loading: true }); // Added loading state
          const response = await axios.put(
            `${API_ENDPOINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              loading: false,
            }); // Added loading: false
          } else {
            set({ loading: false }); // Added for unsuccessful response
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Profile update failed");
          set({ loading: false }); // Added for error case
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
