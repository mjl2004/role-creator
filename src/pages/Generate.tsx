// src/pages/Generate.tsx
import { useEffect, useState } from 'react';
import type { CharacterData } from '../hooks/useCharacterData';

export default function Generate() {
  const [data, setData] = useState<CharacterData | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('character'); // 🔑 读同一个 key
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) return <p>加载中…</p>;

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold mb-2">角色预览</h1>
      <div className="bg-gray-100 rounded p-4 text-sm">
        <div>昵称：{data.nickname}</div>
        <div>性别：{data.gender === 'male' ? '男' : '女'}</div>
        <div>兴趣标签：{data.interests.join(', ')}</div>
        <div>主职业：{data.mainClass || '未选择'}</div>
      </div>
      {/* 后续把名片像素图放这里 */}
    </div>
  );
}