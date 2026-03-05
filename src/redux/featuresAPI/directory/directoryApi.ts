import { baseAPI } from "../../baseAPI/baseApi";

export const directoryApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // GET DIRECTORY
    getDirectory: build.query({
      query: () => ({
        url: "/owner/owner/candidates/",
        method: "GET",
      }),
      providesTags: ["directory"],
    }),
  }),
});

export const { useGetDirectoryQuery } = directoryApi;
