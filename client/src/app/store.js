
import { configureStore } from "@reduxjs/toolkit";
import { spinsapi } from "../api/spinsapi";

export const store = configureStore({

  reducer: { [spinsapi.reducerPath]: spinsapi.reducer 

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spinsapi.middleware) 
});
