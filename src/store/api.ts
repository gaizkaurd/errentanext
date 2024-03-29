import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import queryString from "query-string";
import { Organization } from "./types/Organization";
import { BaseQueryResponseList } from "./types";
import { RootState } from "./store";

export const api = createApi({
  reducerPath: "api",
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE + "/api/v1",
    credentials: "include",
    paramsSerializer(params) {
      return queryString.stringify(params, { arrayFormat: "bracket" });
    },
    prepareHeaders(headers, {getState}) {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },

  }),
  tagTypes: [
    "Organization",
    "Review",
    "TaxIncome",
    "AUTHENTICATED_USER",
    "User",
    "WEB_AUTHN_KEYS",
    "OrganizationInvitation",
    "OrganizationMembership",
    "CalculationManage",
    "CalculatorManage",
    "CallManage",
    "Calculation"
  ],
  endpoints: (build) => ({
    getOrganizations: build.query<Organization[], Record<string, string | string[] | number>>({
      query: (params) => ({
        url: `organizations`,
        params: params,
        method: "get",
      }),
      transformResponse: (response: BaseQueryResponseList<Organization>) => {
        return response.data;
      }
    }),
  }),
});

export const {
  useGetOrganizationsQuery
} = api;
