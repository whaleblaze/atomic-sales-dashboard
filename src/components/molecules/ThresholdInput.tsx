
import Input from '@/components/atoms/Input'

export default function ThresholdInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Sales threshold (£)</label>
      <Input type="number" min={0} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}
