
import Card from '@/components/atoms/Card'

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  )
}
