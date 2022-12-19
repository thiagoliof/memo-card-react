import { configureStore } from '@reduxjs/toolkit'
import gamesReducer  from './reducers/gamesSlice'
import sessionGamesSlice  from './reducers/sessionGamesSlice'

export default configureStore({
  reducer: {
    games: gamesReducer,
    sessionGame: sessionGamesSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})