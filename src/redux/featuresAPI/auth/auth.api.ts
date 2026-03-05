import { baseAPI } from "../../baseAPI/baseApi";
import type { TLoginResponse } from "../../user.type";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginResponse, any>({
      query: (data: { email: string; password: string }) => {
        const formData = new URLSearchParams();
        formData.append("email", data.email);
        formData.append("password", data.password);

        return {
          url: "/auth/login/",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    registerClient: build.mutation({
      query: (data: Record<string, any>) => {
        const formData = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });

        return {
          url: "/auth/register/request-otp/",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    verifyOTP: build.mutation({
      query: (data: { email: string; otp: string }) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("otp", data.otp);

        return {
          url: "/auth/register/verify-otp/",
          method: "POST",
          body: formData,
          // Note: fetchBaseQuery automatically sets Content-Type to multipart/form-data when body is FormData
        };
      },
      invalidatesTags: ["Auth"],
    }),

    updatePassword: build.mutation({
      query: (payload) => ({
        url: "/user/update-password/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: build.mutation({
      query: (data: { email_or_phone: string }) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    updateTenantProfile: build.mutation({
      query: (payload: any) => ({
        url: "/tenant/profile/update_profile/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth", "TenantProfile"],
    }),

    getMe: build.query<any, void>({
      query: () => ({
        url: "/auth/profile/me/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    updateMe: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/auth/profile/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    requestPasswordResetOTP: build.mutation({
      query: (data: { email: string }) => {
        const formData = new URLSearchParams();
        formData.append("email", data.email);

        return {
          url: "/auth/password_forget/request-otp/",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
    }),

    verifyPasswordForgetOTP: build.mutation({
      query: (data: { email: string; otp: string }) => {
        const formData = new URLSearchParams();
        formData.append("email", data.email);
        formData.append("otp", data.otp);

        return {
          url: "/auth/password_forget/verify-otp/",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
    }),

    resetPassword: build.mutation({
      query: (data: { reset_token: string; new_password: string }) => {
        const formData = new FormData();
        formData.append("reset_token", data.reset_token);
        formData.append("new_password", data.new_password);

        return {
          url: "/auth/password_reset/",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterClientMutation,
  useVerifyOTPMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useUpdateTenantProfileMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useRequestPasswordResetOTPMutation,
  useVerifyPasswordForgetOTPMutation,
  useResetPasswordMutation,
} = userAPI;
