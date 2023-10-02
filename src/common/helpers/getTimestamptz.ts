export const getTimestamptz = (date: Date) => {
  let offset: string | number = -date.getTimezoneOffset() / 60
  const sign = offset >= 0 ? "+" : "-"
  offset = Math.abs(offset)
  offset = offset < 10 ? "0" + offset : offset
  let TIMESTAMPTZ = date.toISOString()
  TIMESTAMPTZ = TIMESTAMPTZ.replace("T", " ")
  TIMESTAMPTZ = TIMESTAMPTZ.replace("Z", `000${sign}${offset}`)
  return TIMESTAMPTZ
}
