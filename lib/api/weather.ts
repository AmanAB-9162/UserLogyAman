// Enhanced weather data API with more Indian cities
export async function fetchWeatherData(city: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate random weather data based on city
  const cityData: Record<string, any> = {
    "new-york": {
      city: "New York",
      temperature: Math.floor(Math.random() * 10) + 15, // 15-25°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Sunny", "Partly Cloudy", "Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 10) + 5, // 5-15 km/h
    },
    london: {
      city: "London",
      temperature: Math.floor(Math.random() * 8) + 10, // 10-18°C
      humidity: Math.floor(Math.random() * 20) + 70, // 70-90%
      conditions: ["Rainy", "Cloudy", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 10) + 8, // 8-18 km/h
    },
    tokyo: {
      city: "Tokyo",
      temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Sunny", "Clear", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 4, // 4-12 km/h
    },
    // Indian Cities
    delhi: {
      city: "Delhi",
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 20) + 50, // 50-70%
      conditions: ["Sunny", "Clear", "Hazy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    mumbai: {
      city: "Mumbai",
      temperature: Math.floor(Math.random() * 8) + 26, // 26-34°C
      humidity: Math.floor(Math.random() * 15) + 70, // 70-85%
      conditions: ["Humid", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 10) + 6, // 6-16 km/h
    },
    bangalore: {
      city: "Bangalore",
      temperature: Math.floor(Math.random() * 8) + 20, // 20-28°C
      humidity: Math.floor(Math.random() * 15) + 60, // 60-75%
      conditions: ["Pleasant", "Partly Cloudy", "Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    hyderabad: {
      city: "Hyderabad",
      temperature: Math.floor(Math.random() * 10) + 22, // 22-32°C
      humidity: Math.floor(Math.random() * 20) + 55, // 55-75%
      conditions: ["Sunny", "Clear", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 6, // 6-14 km/h
    },
    patna: {
      city: "Patna",
      temperature: Math.floor(Math.random() * 10) + 24, // 24-34°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Sunny", "Hazy", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    chennai: {
      city: "Chennai",
      temperature: Math.floor(Math.random() * 8) + 27, // 27-35°C
      humidity: Math.floor(Math.random() * 15) + 70, // 70-85%
      conditions: ["Hot", "Humid", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 10) + 7, // 7-17 km/h
    },
    kolkata: {
      city: "Kolkata",
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 20) + 65, // 65-85%
      conditions: ["Humid", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 6, // 6-14 km/h
    },
    // Additional Indian cities
    jaipur: {
      city: "Jaipur",
      temperature: Math.floor(Math.random() * 10) + 24, // 24-34°C
      humidity: Math.floor(Math.random() * 20) + 45, // 45-65%
      conditions: ["Sunny", "Clear", "Hot"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    ahmedabad: {
      city: "Ahmedabad",
      temperature: Math.floor(Math.random() * 10) + 26, // 26-36°C
      humidity: Math.floor(Math.random() * 20) + 50, // 50-70%
      conditions: ["Hot", "Sunny", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 6, // 6-14 km/h
    },
    pune: {
      city: "Pune",
      temperature: Math.floor(Math.random() * 8) + 22, // 22-30°C
      humidity: Math.floor(Math.random() * 15) + 55, // 55-70%
      conditions: ["Pleasant", "Partly Cloudy", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    lucknow: {
      city: "Lucknow",
      temperature: Math.floor(Math.random() * 10) + 24, // 24-34°C
      humidity: Math.floor(Math.random() * 20) + 55, // 55-75%
      conditions: ["Sunny", "Hazy", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    chandigarh: {
      city: "Chandigarh",
      temperature: Math.floor(Math.random() * 10) + 22, // 22-32°C
      humidity: Math.floor(Math.random() * 20) + 50, // 50-70%
      conditions: ["Pleasant", "Partly Cloudy", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    bhopal: {
      city: "Bhopal",
      temperature: Math.floor(Math.random() * 10) + 23, // 23-33°C
      humidity: Math.floor(Math.random() * 20) + 50, // 50-70%
      conditions: ["Sunny", "Clear", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    nagpur: {
      city: "Nagpur",
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 20) + 45, // 45-65%
      conditions: ["Hot", "Sunny", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    kochi: {
      city: "Kochi",
      temperature: Math.floor(Math.random() * 8) + 26, // 26-34°C
      humidity: Math.floor(Math.random() * 15) + 70, // 70-85%
      conditions: ["Humid", "Rainy", "Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 10) + 6, // 6-16 km/h
    },
    guwahati: {
      city: "Guwahati",
      temperature: Math.floor(Math.random() * 8) + 24, // 24-32°C
      humidity: Math.floor(Math.random() * 20) + 65, // 65-85%
      conditions: ["Humid", "Rainy", "Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    bhubaneswar: {
      city: "Bhubaneswar",
      temperature: Math.floor(Math.random() * 8) + 26, // 26-34°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Humid", "Partly Cloudy", "Sunny"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    indore: {
      city: "Indore",
      temperature: Math.floor(Math.random() * 10) + 23, // 23-33°C
      humidity: Math.floor(Math.random() * 20) + 45, // 45-65%
      conditions: ["Sunny", "Clear", "Partly Cloudy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    surat: {
      city: "Surat",
      temperature: Math.floor(Math.random() * 8) + 26, // 26-34°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Humid", "Partly Cloudy", "Sunny"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 6, // 6-14 km/h
    },
    varanasi: {
      city: "Varanasi",
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 20) + 55, // 55-75%
      conditions: ["Sunny", "Hazy", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    agra: {
      city: "Agra",
      temperature: Math.floor(Math.random() * 10) + 24, // 24-34°C
      humidity: Math.floor(Math.random() * 20) + 50, // 50-70%
      conditions: ["Sunny", "Hazy", "Clear"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
    shimla: {
      city: "Shimla",
      temperature: Math.floor(Math.random() * 10) + 10, // 10-20°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      conditions: ["Cool", "Cloudy", "Foggy"][Math.floor(Math.random() * 3)],
      windSpeed: Math.floor(Math.random() * 8) + 5, // 5-13 km/h
    },
  }

  // Generate 7-day forecast
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)

    return {
      date: date.toISOString(),
      temperature: cityData[city].temperature + Math.floor(Math.random() * 6) - 3, // ±3°C variation
      conditions: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
    }
  })

  return {
    ...cityData[city],
    forecast,
  }
}

