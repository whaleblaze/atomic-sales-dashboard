
'use client'
import { useEffect, useMemo, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import Card from '@/components/atoms/Card'
import Heading from '@/components/atoms/Heading'
import ChartTypeToggle, { ChartKind } from '@/components/molecules/ChartTypeToggle'
import SalesPie from './SalesPie'

interface ApiResponse {
  year: number
  monthly: { month: string; revenue: number }[]
  byCategory: { name: string; value: number }[]
  totals: { revenue: number; orders: number; avgOrderValue: number }
}

export default function SalesChart({ year, threshold }: { year: number; threshold: number }) {
  const [kind, setKind] = useState<ChartKind>('bar')
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const url = `/api/sales?year=${year}&threshold=${threshold}`
    fetch(url).then(r => r.json()).then(setData)
  }, [year, threshold])

  const monthly = data?.monthly ?? []

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Heading title={`Sales ${year}`} subtitle={kind === 'pie' ? 'Distribution' : 'Monthly revenue'} />
        <ChartTypeToggle kind={kind} onChange={setKind} />
      </div>
      {kind === 'pie' ? (
        <SalesPie data={data?.byCategory ?? []} />
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {kind === 'bar' ? (
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `£${v/1000}k`} />
                <Tooltip formatter={(v: any) => `£${Number(v).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#111827" radius={[4,4,0,0]} />
              </BarChart>
            ) : (
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `£${v/1000}k`} />
                <Tooltip formatter={(v: any) => `£${Number(v).toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-xs text-gray-500">Total revenue</div>
            <div className="text-xl font-semibold">£{data.totals.revenue.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-xs text-gray-500">Orders</div>
            <div className="text-xl font-semibold">{data.totals.orders.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-xs text-gray-500">Avg order value</div>
            <div className="text-xl font-semibold">£{data.totals.avgOrderValue.toLocaleString()}</div>
          </div>
        </div>
      )}
    </Card>
  )
}
