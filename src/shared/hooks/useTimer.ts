import { useEffect, useState } from "react"

type timerStateType = "initial" | "running" | "timeout" | "paused"

interface props {
  finalTime: number,
  timeGap: number,
  callback?: () => void,
  isUnversed?: boolean
}

export const useTimer = ({ isUnversed, callback, timeGap, finalTime }: props) => {

  const [time] = useState<number>(finalTime)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timerState, setTimerState] = useState<timerStateType>("initial")


  useEffect(() => {

    //finishing
    if (time === currentTime) {
      setTimerState("timeout")
      if (callback) callback()
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

  return { Start, Stop, Reset, time: isUnversed ? finalTime - currentTime : currentTime, timerState }

}
