import { useEffect, useState } from 'react'
import type { Card } from '../types'

export default function Generate() {
  const [card, setCard] = useState<Card | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('card')
    if (raw) setCard(JSON.parse(raw))
  }, [])

  if (!card) return <p>加载中…</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">预览名片</h1>
      <pre className="text-sm">{JSON.stringify(card, null, 2)}</pre>
      {/* 下一期再调像素生成接口 */}
    </div>
  )
}