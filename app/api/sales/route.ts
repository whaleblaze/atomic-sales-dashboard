
import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

type Row = {
  order_id: string
  order_date: string
  product_id: string
  product_category: string
  price: string
  discount_percent: string
  quantity_sold: string
  customer_region: string
  payment_method: string
  rating: string
  review_count: string
  discounted_price: string
  total_revenue: string
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function round2(n: number) { return Math.round(n * 100) / 100 }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = Number(searchParams.get('year') || '2023')
  const threshold = Number(searchParams.get('threshold') || '0')

  const filePath = path.join(process.cwd(), 'public', 'data', 'amazon_sales_dataset.csv')
  const csv = fs.readFileSync(filePath, 'utf8')
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as Row[]

  // Filter by threshold and aggregate
  const byYear = new Map<number, Row[]>()
  for (const r of rows) {
    const d = new Date(r.order_date)
    const yr = d.getFullYear()
    const total = Number(r.total_revenue || 0)
    if (Number.isFinite(total) && total >= threshold) {
      if (!byYear.has(yr)) byYear.set(yr, [])
      byYear.get(yr)!.push(r)
    }
  }

  // Helper to build aggregates for a specific year from rows
  function aggregatesFromRows(list: Row[]) {
    const monthly = MONTHS.map((m) => ({ month: m, revenue: 0 }))
    const cat = new Map<string, number>()
    let revenue = 0
    let orders = 0

    for (const r of list) {
      const d = new Date(r.order_date)
      const m = d.getMonth()
      const val = Number(r.total_revenue || 0)
      if (!Number.isFinite(val)) continue
      monthly[m].revenue += val
      revenue += val
      orders += 1
      const c = r.product_category || 'Unknown'
      cat.set(c, (cat.get(c) || 0) + val)
    }

    const byCategory = Array.from(cat.entries()).map(([name, value]) => ({ name, value }))
    const avgOrderValue = orders ? revenue / orders : 0

    // Round
    for (const m of monthly) m.revenue = round2(m.revenue)

    return {
      monthly,
      byCategory,
      totals: { revenue: round2(revenue), orders, avgOrderValue: round2(avgOrderValue) }
    }
  }

  // Build 2022 & 2023 from data
  const agg2022 = aggregatesFromRows(byYear.get(2022) || [])
  const agg2023 = aggregatesFromRows(byYear.get(2023) || [])

  // Build synthetic 2024 from 2023 monthly (+5%)
  const synthGrowth = 1.05
  const monthly2024 = agg2023.monthly.map((m) => ({ month: m.month, revenue: round2(m.revenue * synthGrowth) }))
  const byCategory2024 = agg2023.byCategory.map((c) => ({ name: c.name, value: round2(c.value * synthGrowth) }))
  const totals2024 = {
    revenue: round2(agg2023.totals.revenue * synthGrowth),
    orders: agg2023.totals.orders, // keep same order count for demo
    avgOrderValue: agg2023.totals.orders ? round2((agg2023.totals.revenue * synthGrowth) / agg2023.totals.orders) : 0,
  }

  const byYearAgg: Record<number, { monthly: { month: string; revenue: number }[]; byCategory: { name: string; value: number }[]; totals: { revenue: number; orders: number; avgOrderValue: number } }> = {
    2022: agg2022,
    2023: agg2023,
    2024: { monthly: monthly2024, byCategory: byCategory2024, totals: totals2024 }
  }

  const payload = { year, ...(byYearAgg[year] || { monthly: [], byCategory: [], totals: { revenue: 0, orders: 0, avgOrderValue: 0 } }) }
  return NextResponse.json(payload)
}
