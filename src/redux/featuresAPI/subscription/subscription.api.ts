import { baseAPI } from "../../baseAPI/baseApi";

export const subscriptionApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getSubscriptionStatus: build.query({
            query: () => ({
                url: "/subscription/status/",
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        createCheckout: build.mutation({
            query: () => ({
                url: "/subscription/create-checkout/",
                method: "POST",
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

export const { useGetSubscriptionStatusQuery, useCreateCheckoutMutation } = subscriptionApi;
