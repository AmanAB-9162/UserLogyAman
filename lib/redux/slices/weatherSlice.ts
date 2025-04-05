import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWeatherData } from "@/lib/api/weather"

interface WeatherItem {
  city: string
  temperature: number
  humidity: number
  conditions: string
}

interface WeatherState {
  data: WeatherItem[]
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  const cities = [
    "new-york",
    "london",
    "tokyo",
    "delhi",
    "mumbai",
    "bangalore",
    "hyderabad",
    "patna",
    "chennai",
    "kolkata",
    "jaipur",
    "ahmedabad",
    "pune",
    "lucknow",
    "chandigarh",
    "bhopal",
    "nagpur",
    "kochi",
    "guwahati",
    "bhubaneswar",
    "indore",
    "surat",
    "varanasi",
    "agra",
    "shimla",
  ]
  const weatherPromises = cities.map((city) => fetchWeatherData(city))
  return Promise.all(weatherPromises)
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeatherData: (state, action) => {
      const { city, temperature, humidity, conditions } = action.payload
      const index = state.data.findIndex((item) => item.city.toLowerCase() === city.toLowerCase())
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          temperature,
          humidity,
          conditions,
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather data"
      })
  },
})

export const { updateWeatherData } = weatherSlice.actions
export default weatherSlice.reducer

