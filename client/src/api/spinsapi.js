import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const spinsapi = createApi({
    reducerPath: "spinsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8080/api"
    }), 
    endpoints: (builder) => 
      ({
          getAlbums: builder.query({
            query: () => '/albums', 
          }),
          getSingleAlbum:  builder.query({
            query: (id) => `/albums/${id}`,
          }),
          addLogin: builder.mutation({
            query: (body) => ({
              url: "/users/login",
              method: "POST",
              body,
            }),
          }),
          getMe: builder.query({
            query: (token) => ({
              url: "/users/me",
              headers: {Authorization: `Bearer ${token}`}
            }), 
          }),
          addRegistration: builder.mutation({
            query: (body) => ({
              url: "/users/register",
              method: "POST",
              body: body,
            }),
          }),
          getCollections: builder.query({
            query: (token) => ({
              url: "/collections",
              headers: {Authorization: `Bearer ${token}`}
            }),
          }),
          getSingleCollection: builder.query({
            query: (id) => ({
              url: `/collections/${id}`,
              headers: {Authorization: `Bearer ${token}`}
            }),
          }),
          deleteCollection: builder.mutation({
            query: ({id, token}) => ({
              url: `/collections/${id}`,
              method: "DELETE",
              headers: {Authorization: `Bearer ${token}`},
            })
          }),
          getJournals: builder.query({
            query: (token) => ({
              url: "/journals",
              headers: {Authorization: `Bearer ${token}`}
              })
            }),
          getReviews: builder.query({
              query: (token) => ({
                url: "/reviews",
                headers: {Authorization: `Bearer ${token}`}
                })
           }),
    })
  });
  
  export const { 
    useGetAlbumsQuery,
     useGetSingleAlbumQuery, 
     useAddLoginMutation, 
     useGetMeQuery, 
     useAddRegistrationMutation, 
     useGetCollectionsQuery, 
     useDeleteCollectionMutation, 
     useGetJournalsQuery, 
     useGetReviewsQuery, 
     useGetSingleCollectionQuery
     } = spinsapi;