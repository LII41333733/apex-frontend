// Need to use the React-specific entry point to import createApi
import { OptionType, RiskType, TradeLeg } from "@/constants";
import Quote from "@/interfaces/Quote";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum URL_METHOD {
  GET = "GET",
  POST = "POST",
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const apexApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APEX_URL,
  }),
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
    placeTrade: builder.mutation<
      unknown,
      { option: string; price: number; riskType: string }
    >({
      query: (body) => ({
        url: "trade/placeTrade",
        method: URL_METHOD.POST,
        body,
      }),
    }),
    cancelTrade: builder.mutation({
      query: (body) => ({
        url: "trade/cancelTrade",
        method: URL_METHOD.POST,
        body,
      }),
    }),
    modifyTrade: builder.mutation({
      query: (body) => ({
        url: "trade/modifyTrade",
        method: URL_METHOD.POST,
        body,
      }),
    }),
    sellTrade: builder.mutation({
      query: (body) => ({
        url: "trade/sellTrade",
        method: URL_METHOD.POST,
        body,
      }),
    }),
    stopOptionsChain: builder.mutation({
      query: () => ({
        url: "market/stopOptionsChain",
        method: URL_METHOD.POST,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: URL_METHOD.POST,
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetOptionsChainMutation,
  usePlaceTradeMutation,
  useStopOptionsChainMutation,
  useCancelTradeMutation,
  useLoginMutation,
  useModifyTradeMutation,
  useSellTradeMutation,
} = apexApi;
