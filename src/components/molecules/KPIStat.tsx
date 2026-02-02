
import Card from '@/components/atoms/Card'

export default function KPIStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </Card>
  )
}
