import { WeatherSection } from "@/components/dashboard/weather-section"
import { CryptoSection } from "@/components/dashboard/crypto-section"
import { NewsSection } from "@/components/dashboard/news-section"
import { SearchBar } from "@/components/dashboard/search-bar"
import { Footer } from "@/components/footer"
import { CryptoPurchaseWidget } from "@/components/crypto/crypto-purchase-widget"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-6 flex-1">
        <SearchBar />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-1">
                <WeatherSection />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <CryptoSection />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <NewsSection />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <CryptoPurchaseWidget />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

