import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
const BASE_URL = `https://spins-project.onrender.com/api`;

const tryGetToken = (token) => {
    if (token) {
        return token
    }

    const cookie_token = Cookies.get("token")
    if (cookie_token) {
        return cookie_token
    } else {
        return null
    }
}

export const spinsapi = createApi({
    reducerPath: "spinsapi",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
    }), 
    tagTypes: ["reviews", "collections"],
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
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }), 
          }),
          addRegistration: builder.mutation({
            query: (body) => ({
              url: "/users/register",
              method: "POST",
              body: body,
              headers: {
                'Content-Type': 'application/json'
              }
            })
          }),
          getCollections: builder.query({
            query: (token) => ({
              url: "/collections",
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
            providesTags: ["collections"],
          }),
          addCollection: builder.mutation({
            query: (body) => ({
              url: "/collections",
              method: "POST",
              body: body,
              headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${tryGetToken(body.token)}`}
            }),
            invalidatesTags: ["collections"],
          }),
          getSingleCollection: builder.query({
            query: (id, token) => ({
              url: `/collections/${id}`,
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
            providesTags: ["collections"],
          }),
          addCollectionEntry: builder.mutation({
            query: (body) => ({
              url: "/collections",
              method: "POST",
              body: body,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tryGetToken(body.token)}`}
            }),
            invalidatesTags: ["collections"],
          }),
          getCollectionAlbums: builder.query({
            query: (id, token) => ({
              url: `/collections/${id}/albums`,
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
            providesTags: ["collections"],
          }),
          deleteCollection: builder.mutation({
            query: ({id, token}) => ({
              url: `/collections/${id}`,
              method: "DELETE",
              headers: {Authorization: `Bearer ${tryGetToken(token)}`},
            }),
            invalidatesTags: ["collections"],
          }),
          deleteCollectionAlbum: builder.mutation({
            query: ({id, token, album_id}) => ({
              url: `/collections/${id}/${album_id}`,
              method: "DELETE",
              headers:  {Authorization: `Bearer ${tryGetToken(token)}`},
            }),
            invalidatesTags: ["collections"],
          }),
          getReviews: builder.query({
              query: (token) => ({
                url: "/reviews",
                headers: {Authorization: `Bearer ${tryGetToken(token)}`}
                }),
              providesTags: ["reviews"],
           }),
          addReview: builder.mutation({
            query: (body, token) => ({
              url: "/reviews",
              method: "POST",
              body: body,
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }), 
            invalidatesTags: ["reviews"],
          }),
          deleteReview: builder.mutation({
            query: (reviewId, token) => ({
              url: `/reviews/${reviewId}`,
              method: "DELETE",
              headers: {Authorization: `Bearer ${tryGetToken(token)}`},
           }),
           invalidatesTags: ["reviews"],
          }),
          editReview: builder.mutation({
            query: (review, token) => ({
              url: `/reviews/${review.id}`,
              method: "PUT",
              body: review,
             headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
            invalidatesTags: ["reviews"],
          }),
      })
  });
  
  export const { 
    useGetAlbumsQuery,
     useGetSingleAlbumQuery, 
     useAddLoginMutation, 
     useAddReigstrationMutation,
     useGetMeQuery, 
     useAddRegistrationMutation, 
     useGetCollectionsQuery, 
     useAddCollectionMutation,
     useGetSingleCollectionQuery,
     useGetCollectionAlbumsQuery,
     useAddCollectionEntryMutation,
     useDeleteCollectionMutation, 
     useDeleteCollectionAlbumMutation,
     useGetJournalsQuery, 
     useGetReviewsQuery, 
     useAddReviewMutation,
     useDeleteReviewMutation,
     useEditReviewMutation,
     useLazyGetCollectionAlbumsQuery,
     useLazyGetSingleAlbumQuery
     } = spinsapi;