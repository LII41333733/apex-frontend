// Need to use the React-specific entry point to import createApi
import { OptionType } from "@/constants";
import Quote from "@/interfaces/Quote";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum URL_METHOD {
  GET = "GET",
  POST = "POST",
}

// Define a service using a base URL and expected endpoints
export const apexApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APEX_URL }),
  endpoints: (builder) => ({
    getOptionsChain: builder.mutation<
      Quote[],
      { symbol: string; optionType: OptionType }
    >({
      query: ({ symbol, optionType }) => ({
        url: `market/getOptionsChain?symbol=${symbol}&optionType=${optionType.toLowerCase()}`,
        method: URL_METHOD.GET,
      }),
    }),
    placeTrade: builder.mutation<unknown, { option: string; price: number }>({
      query: (body) => ({
        url: "trade/placeTrade",
        method: URL_METHOD.POST,
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOptionsChainMutation, usePlaceTradeMutation } = apexApi;
