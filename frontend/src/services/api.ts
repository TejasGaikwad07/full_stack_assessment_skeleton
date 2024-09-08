// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Home {
  id: number;
  street_address: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
}

export interface HomeResponse {
  homes: Home[];
  currentPage: number;
  totalPages: number;
  totalHomes: number;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/user/find-all',
    }),
    getHomesByUser: builder.query<HomeResponse, { userId: number; page: number }>({
      query: ({ userId, page = 1 }) => 
        `/home/find-by-user?userId=${userId}&page=${page}`,
    }),
    getUsersByHome: builder.query<User[], number>({
      query: (homeId) => `/user/find-by-home?homeId=${homeId}`,
    }),
    updateUsersForHome: builder.mutation<{ message: string; home: Home }, { homeId: number; userIds: number[] }>({
      query: ({ homeId, userIds }) => ({
        url: '/home/update-users',
        method: 'PUT',
        body: { homeId, userIds },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useGetUsersByHomeQuery,
  useUpdateUsersForHomeMutation,
} = api;