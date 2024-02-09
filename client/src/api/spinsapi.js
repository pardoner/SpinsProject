import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

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
      baseUrl: "`https://spins-project.onrender.com/api"
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
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
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
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
          }),
          getSingleCollection: builder.query({
            query: (id) => ({
              url: `/collections/${id}`,
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
            }),
          }),
          deleteCollection: builder.mutation({
            query: ({id, token}) => ({
              url: `/collections/${id}`,
              method: "DELETE",
              headers: {Authorization: `Bearer ${tryGetToken(token)}`},
            })
          }),
          getJournals: builder.query({
            query: (token) => ({
              url: "/journals",
              headers: {Authorization: `Bearer ${tryGetToken(token)}`}
              })
            }),
          getReviews: builder.query({
              query: (token) => ({
                url: "/reviews",
                headers: {Authorization: `Bearer ${tryGetToken(token)}`}
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