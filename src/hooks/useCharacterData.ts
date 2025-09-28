// src/hooks/useCharacterData.ts
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'character';

export type Gender = 'male' | 'female' | '';

export interface CharacterData {
  nickname: string;
  gender: Gender;
  interests: string[];          // 所有兴趣 id
  mainClass: string;            // 主职业 id
  subClass: string;            // 副职业 id（预留）
}

const defaultData: CharacterData = {
  nickname: '',
  gender: '',
  interests: [],
  mainClass: '',
  subClass: '',
};

export function useCharacterData() {
  const [data, setData] = useState<CharacterData>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  /* 以下方法均返回新对象，保证 React 触发 re-render */
  const setNickname = (val: string) =>
    setData(prev => ({ ...prev, nickname: val }));

  const setGender = (val: Gender) =>
    setData(prev => ({ ...prev, gender: val }));

  const setInterests = (val: string[]) =>
    setData(prev => ({ ...prev, interests: val }));

  const setMainClass = (val: string) =>
    setData(prev => ({ ...prev, mainClass: val }));

  const setSubClass = (val: string) =>
    setData(prev => ({ ...prev, subClass: val }));

  const reset = () => setData(defaultData);

  return {
    data,
    setNickname,
    setGender,
    setInterests,
    setMainClass,
    setSubClass,
    reset,
  };
}