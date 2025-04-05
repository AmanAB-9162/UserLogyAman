// Enhanced news data API with real links
export async function fetchNewsData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate mock news data with real links
  const news = [
    {
      title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
      source: "CryptoNews",
      url: "https://www.coindesk.com/markets/2023/02/20/bitcoin-surges-past-50k-for-first-time-since-december-2021/",
      date: "2 hours ago",
    },
    {
      title: "Ethereum 2.0 Upgrade: What You Need to Know",
      source: "BlockchainInsider",
      url: "https://ethereum.org/en/eth2/",
      date: "5 hours ago",
    },
    {
      title: "Solana Network Experiences Brief Outage, Quickly Recovers",
      source: "CoinDesk",
      url: "https://www.coindesk.com/tech/2022/06/01/solana-blockchain-halted-during-market-meltdown-and-then-restarted/",
      date: "8 hours ago",
    },
    {
      title: "Major Bank Announces Crypto Custody Services for Institutional Clients",
      source: "FinancialTimes",
      url: "https://www.ft.com/content/16414f84-32a9-4640-b141-a9c5bc51dc5a",
      date: "10 hours ago",
    },
    {
      title: "New Regulatory Framework for Cryptocurrencies Proposed",
      source: "CryptoRegulation",
      url: "https://www.weforum.org/agenda/2022/02/crypto-regulations-cryptocurrency-policy/",
      date: "12 hours ago",
    },
    {
      title: "NFT Market Shows Signs of Recovery After Months of Decline",
      source: "NFTWorld",
      url: "https://nftnow.com/guides/nft-market-recovery-signs/",
      date: "1 day ago",
    },
    {
      title: "DeFi Protocol Launches New Yield Farming Opportunities",
      source: "DeFiPulse",
      url: "https://defipulse.com/blog/",
      date: "1 day ago",
    },
    {
      title: "Crypto Mining Companies Shift Towards Renewable Energy",
      source: "GreenCrypto",
      url: "https://www.weforum.org/agenda/2022/03/crypto-mining-energy-consumption/",
      date: "2 days ago",
    },
    {
      title: "Central Bank Digital Currencies: The Future of Money?",
      source: "EconomicReview",
      url: "https://www.imf.org/en/Publications/fandd/issues/2022/09/Stepping-up-CBDC-Soderberg",
      date: "2 days ago",
    },
    {
      title: "Major Retailer Begins Accepting Cryptocurrency Payments",
      source: "RetailNews",
      url: "https://www.cnbc.com/2023/03/21/major-retailers-accepting-crypto-payments.html",
      date: "3 days ago",
    },
    {
      title: "India's Crypto Market Sees Surge in Trading Volume",
      source: "IndiaFinance",
      url: "https://economictimes.indiatimes.com/markets/cryptocurrency",
      date: "3 days ago",
    },
    {
      title: "New Weather Prediction Models Use AI to Improve Accuracy",
      source: "WeatherTech",
      url: "https://www.nature.com/articles/s41586-021-03854-z",
      date: "4 days ago",
    },
    {
      title: "Climate Change Impact on Monsoon Patterns in India",
      source: "Environmental Science",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0959378015300674",
      date: "4 days ago",
    },
    {
      title: "Global Cryptocurrency Regulation: A Comparative Study",
      source: "CryptoLaw Journal",
      url: "https://www.imf.org/en/Publications/fintech-notes/Issues/2023/03/07/Regulating-the-Crypto-Ecosystem-530223",
      date: "5 days ago",
    },
    {
      title: "Extreme Weather Events Increasing Due to Climate Change",
      source: "Climate Monitor",
      url: "https://www.ipcc.ch/report/ar6/wg1/",
      date: "5 days ago",
    },
  ]

  return news
}

