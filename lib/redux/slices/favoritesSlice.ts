import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  cities: string[]
  coins: string[]
}

// Load favorites from localStorage if available
const loadFavorites = (): FavoritesState => {
  if (typeof window !== "undefined") {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      return JSON.parse(savedFavorites)
    }
  }
  return { cities: [], coins: [] }
}

const initialState: FavoritesState = loadFavorites()

interface FavoritePayload {
  type: "city" | "coin"
  id: string
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      const { type, id } = action.payload
      if (type === "city" && !state.cities.includes(id)) {
        state.cities.push(id)
      } else if (type === "coin" && !state.coins.includes(id)) {
        state.coins.push(id)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state))
      }
    },
    removeFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      const { type, id } = action.payload
      if (type === "city") {
        state.cities = state.cities.filter((city) => city !== id)
      } else if (type === "coin") {
        state.coins = state.coins.filter((coin) => coin !== id)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state))
      }
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

