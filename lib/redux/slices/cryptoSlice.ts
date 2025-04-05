import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCryptoData } from "@/lib/api/crypto"

interface CryptoItem {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
}

interface CryptoState {
  data: CryptoItem[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  const coins = ["bitcoin", "ethereum", "solana"]
  const cryptoPromises = coins.map((coin) => fetchCryptoData(coin))
  return Promise.all(cryptoPromises)
})

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price, change24h } = action.payload
      const index = state.data.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.data[index].price = price
        state.data[index].change24h = change24h
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto data"
      })
  },
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer

