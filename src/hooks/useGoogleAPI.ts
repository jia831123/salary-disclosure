import { useState } from 'react'

type FixedLengthArray<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : FixedLengthArray<T, N, [T, ...R]>

export interface SalaryData {
  timeState: string
  companyName: string
  position: string
  rank: string
  relateJobExperience: string
  currentJobExperience: string
  salary: string
  bonus: string
  allSalary: string
  averageTimePeerDay: string
  overTimeEveryMonth: string
  overtimeFrequency: string
  happy: string
  loading: string
  other: string
  index: number
}
type FourteenStringsArray = FixedLengthArray<string, 15>
export const useGoogleApi = () => {
  const SHEETS_ID = '1GMYKVBxRlMv6oNVNzpXYoLUSyT8ZnLEjGcRbn0b4KsA'
  const TABLED_NAME = '表單回應 1'
  const [isLoading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gapi] = useState(window['gapi'])
  const init = () =>
    new Promise((res, rej) => {
      try {
        gapi.load('client', function () {
          const key = import.meta.env.VITE_API_KEY
          console.log(key)
          gapi.client
            .init({
              apiKey: key,
              discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            })
            .then((r) => {
              res(r)
            })
        })
      } catch (err) {
        rej(err)
      }
    })

  const getDataFromGoogleSheets = async (): Promise<FourteenStringsArray[]> => {
    setLoading(true)
    if (!gapi) {
      console.warn(`gapi not found`)
      return []
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (gapi as any).client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEETS_ID,
        range: TABLED_NAME,
      })
      return res.result.values as FourteenStringsArray[]
    } catch (error) {
      console.error(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const transformDataToJson = (data: FourteenStringsArray[]) => {
    if (!data.length) return
    const keys = [
      'timeState',
      'companyName',
      'rank',
      'position',
      'relateJobExperience',
      'currentJobExperience',
      'salary',
      'bonus',
      'allSalary',
      'averageTimePeerDay',
      'overTimeEveryMonth',
      'overtimeFrequency',
      'happy',
      'loading',
      'other',
    ]
    // const keysNames = [
    //   '時間戳記',
    //   '公司名稱',
    //   '職務',
    //   '職級',
    //   '相關年資',
    //   '現職年資',
    //   '月底薪(幾萬)',
    //   'Bonus (幾個月)',
    //   '總年薪(多萬) 分紅+年終+底薪',
    //   '每日平均工時',
    //   '每月加班',
    //   '加班頻率',
    //   '爽度(1~5) 5最爽 ',
    //   'Loading',
    //   '心得 是否推薦 面試相關....etc',
    // ]

    const jsonArray: SalaryData[] = data
      .filter((_, index) => index !== 0)
      .map((each) =>
        each.reduce(
          (acc, cur, index) =>
            Object.assign(acc, {
              [keys[index]]: cur,
            }),
          {},
        ),
      )
      .map((each, index) => ({ ...each, index })) as SalaryData[]

    return jsonArray.map((each) => {
      let result = { ...each }
      if (result.allSalary.includes('萬')) result = { ...result, allSalary: result.allSalary.replace('萬', '') }
      if (Number(result.salary) > 1000) result = { ...result, salary: String(Number(result.salary) / 10000) }
      if (Number(result.allSalary) > 10000) result = { ...result, allSalary: String(Number(result.allSalary) / 10000) }
      return result
    })
  }
  return { gapi, getDataFromGoogleSheets, init, transformDataToJson, isLoading }
}
export default useGoogleApi
