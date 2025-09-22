import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import type { Card } from '../types'

export default function CardForm() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', job: '', selfDesc: '' })

  const submit = () => {
    const card: Card = { ...form, id: uuid() }
    localStorage.setItem('card', JSON.stringify(card)) // 先本地存
    nav('/create')
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">创建我的名片</h1>
      <input
        className="border rounded px-3 py-2"
        placeholder="姓名"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border rounded px-3 py-2"
        placeholder="职业"
        value={form.job}
        onChange={(e) => setForm({ ...form, job: e.target.value })}
      />
      <textarea
        className="border rounded px-3 py-2"
        placeholder="用一句话描述自己"
        value={form.selfDesc}
        onChange={(e) => setForm({ ...form, selfDesc: e.target.value })}
      />
      <button
        className="bg-blue-500 text-white rounded px-4 py-2"
        onClick={submit}
      >
        生成像素人
      </button>
    </div>
  )
}