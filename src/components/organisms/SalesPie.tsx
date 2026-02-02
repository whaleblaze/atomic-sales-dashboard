
'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '@/components/atoms/Card'
import Heading from '@/components/atoms/Heading'

export default function SalesPie({ data }: { data: { name: string; value: number }[] }) {
  const colors = ['#111827', '#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#a855f7', '#0ea5e9']
  return (
    <Card className="p-4">
      <Heading title="Sales by Category" subtitle="Pie chart" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
              {data.map((_, idx) => (
                <Cell key={idx} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: any) => `£${Number(v).toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
