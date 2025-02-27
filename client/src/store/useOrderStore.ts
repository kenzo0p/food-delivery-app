import { CheckoutSessionRequest, OrderState } from '@/types/orderTypes'
import axios from 'axios';
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const API_ENDPOINT = import.meta.env.VITE_RESTAURANT_ORDERS_ENDPOINT;
if(!API_ENDPOINT) {
    throw new Error("ORDERS_ENDPOINT environment variable is not defined")
}
axios.defaults.withCredentials = true;
export const useOrderStore = create<OrderState>()(persist( (set => ({
    loading:false,
    orders : [],
    createCheckoutSession : async(checkoutSession : CheckoutSessionRequest) => {
        try {
            set({loading : true});
            const response = await axios.post(`${API_ENDPOINT}/chechout/create-checkout-session` , checkoutSession , {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            window.location.href = response.data.session.url;
           set({loading : false});

        } catch (error) {
            set({loading : false});
        }
    },
    getOrderDetails : async() => {
        try {
            set({loading : true});
            const response = await axios.post(`${API_ENDPOINT}/`);
            
            set({loading : false , orders : response.data.orders});
        } catch (error) {
            
            set({loading : false});
        }
    }
})), {
    name : 'order-name',
    storage : createJSONStorage(() => localStorage)
}))