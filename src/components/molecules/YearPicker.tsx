

export default function YearPicker({ value, onChange }: { value: number; onChange: (year: number) => void }) {
  return (
    <select
      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
    >
      {[2022, 2023, 2024].map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  )
}
