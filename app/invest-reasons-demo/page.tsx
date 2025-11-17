import InvestReasons from '@/components/InvestReasons'

export const metadata = {
  title: 'Top 10 Reasons to Invest in Puglia | Invest in Puglia',
  description: 'Discover why sophisticated investors choose Puglia: EU grants up to 60%, 7% flat tax, exploding tourism demand, and exceptional Mediterranean lifestyle.',
}

export default function InvestReasonsDemoPage() {
  return (
    <div className="min-h-screen">
      <InvestReasons />
    </div>
  )
}
