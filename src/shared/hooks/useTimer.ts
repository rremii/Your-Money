import { useEffect, useState } from "react"

type timerStateType = "initial" | "running" | "timeout" | "paused"

export const useTimer = (initTime: number, timeGap: number, callback: () => void) => {

  const [time] = useState<number>(initTime)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timerState, setTimerState] = useState<timerStateType>("initial")


  useEffect(() => {

    if (time === currentTime) {
      setTimerState("timeout")
      callback()
    }

    if (timerState !== "running") return

    const timer = setTimeout(() => {
      setCurrentTime((time) => time + timeGap)
    }, timeGap * 1000)

    return () => window.clearTimeout(timer)

  }, [timerState, currentTime])

  const Start = () => {
    setTimerState("running")
  }

  const Stop = () => {
    setTimerState("paused")
  }
  const Reset = () => {
    setTimerState("running")
    setCurrentTime(0)
  }

  return { Start, Stop, Reset, time: currentTime, timerState }

}
