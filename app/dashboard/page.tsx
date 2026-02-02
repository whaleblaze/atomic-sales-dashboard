
'use client'
import { useState } from 'react'
import YearPicker from '@/components/molecules/YearPicker'
import ThresholdInput from '@/components/molecules/ThresholdInput'
import SalesChart from '@/components/organisms/SalesChart'
import DashboardTemplate from '@/templates/DashboardTemplate'

export default function DashboardPage() {
  const [year, setYear] = useState<number>(2023)
  const [threshold, setThreshold] = useState<number>(0)

  return (
    <DashboardTemplate>
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <YearPicker value={year} onChange={setYear} />
          <ThresholdInput value={threshold} onChange={setThreshold} />
        </div>
      </div>
      <SalesChart year={year} threshold={threshold} />
    </DashboardTemplate>
  )
}
