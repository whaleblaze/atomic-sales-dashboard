
import Button from '@/components/atoms/Button'

export type ChartKind = 'bar' | 'line' | 'pie'

export default function ChartTypeToggle({ kind, onChange }: { kind: ChartKind; onChange: (k: ChartKind) => void }) {
  const kinds: ChartKind[] = ['bar', 'line', 'pie']
  return (
    <div className="inline-flex gap-2">
      {kinds.map(k => (
        <Button key={k} variant={k === kind ? 'default' : 'outline'} onClick={() => onChange(k)}>
          {k.charAt(0).toUpperCase() + k.slice(1)}
        </Button>
      ))}
    </div>
  )
}
