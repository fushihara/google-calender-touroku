import { useState, useMemo } from 'react';
import './App.css';
import { CalendarRegistration } from './Schedule.tsx';
type Prop = {
  xxx: string,
}
export default function App(prop: Prop) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((count) => count + 1);
  const baseUrl = import.meta.env.BASE_URL; // "/" や "/hoge/kage" など。 / の場合は単純結合してはいけないので注意
  return <CalendarRegistration></CalendarRegistration>
}