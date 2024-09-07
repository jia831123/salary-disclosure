export function convertToDateFormat(dateStr: string): string {
  // 匹配日期和時間部分
  const datePattern = /(\d{4})\/(\d{1,2})\/(\d{1,2})/
  const timePattern = /(\d{1,2}):(\d{1,2}):(\d{1,2})/
  const periodPattern = /(上午|下午)/

  const dateMatch = dateStr.match(datePattern)
  const timeMatch = dateStr.match(timePattern)
  const periodMatch = dateStr.match(periodPattern)
  if (!dateMatch || !timeMatch || !periodMatch) {
    console.log(dateStr)
    debugger
    throw new Error('Invalid date format')
  }

  let [_, year, month, day] = dateMatch
  let [__, hourStr, minute, second] = timeMatch
  const period = periodMatch[0]

  // 將 hourStr 轉換為 number
  let hour: number = parseInt(hourStr, 10)

  // 處理上午/下午
  if (period === '下午' && hour < 12) {
    hour += 12
  } else if (period === '上午' && hour === 12) {
    hour = 0 // 上午12點應該是00:00
  }

  // 轉換成 YYYY-MM-DDTHH:mm:ss 格式
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(
    hour,
  ).padStart(2, '0')}:${minute}:${second}`
  return formattedDate
}
