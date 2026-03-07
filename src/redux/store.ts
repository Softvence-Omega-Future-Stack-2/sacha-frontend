import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './featuresAPI/auth/auth.slice'
import { baseAPI } from './baseAPI/baseApi'
import { chatApi } from './featuresAPI/chat/chat.api'
import { notificationsApi } from './featuresAPI/notifications/notifications.api'

const persistConfig = {
  key: 'auth',
  storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseAPI.middleware, chatApi.middleware, notificationsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);