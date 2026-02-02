
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Atomic Sales Dashboard</h1>
      <p className="text-gray-600">A minimal dashboard that visualizes sales for 2022, 2023 (from CSV) and synthetic 2024 data.</p>
      <Link href="/dashboard" className="inline-block bg-black text-white px-4 py-2 rounded-md">Go to Dashboard</Link>
    </div>
  )
}
