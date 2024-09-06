import { FilterConfig } from '../type'
import { SalaryData } from './useGoogleAPI'

export function useDataTransfer(data: SalaryData[]) {
  if (!data) return []
  function allSalaryTransfer(allSalary: string) {
    let result
    if (!Number.isNaN(Number(allSalary))) result = allSalary
    const allSalaryNonSpace = allSalary.replaceAll(' ', '')
    if (allSalaryNonSpace.includes('-')) result = allSalaryNonSpace.match(/(?<=-)\d+/)
    if (allSalaryNonSpace.includes('~')) result = allSalaryNonSpace.match(/(?<=~)\d+/)
    result = allSalary.match(/^\d+/)
    if (Number(result) > 10000) result = Number(result) / 10000
    return String(result)
  }
  return data.map((each) => ({
    ...each,
    allSalary: allSalaryTransfer(each.allSalary),
  }))
}
export function getDefaultFilterConfig(): FilterConfig {
  return {
    name: 'default',
    componyName: {
      value: '',
      condition: 'include',
      state: false,
    },
    allSalary: {
      value: 0,
      condition: 'equal',
      state: false,
    },
    salary: {
      value: 0,
      condition: 'equal',
      state: false,
    },
    rank: {
      value: '',
      condition: 'include',
      state: false,
    },
    position: {
      value: '',
      condition: 'include',
      state: false,
    },
    bonus: { value: 0, condition: 'equal', state: false },
    happy: { value: 0, condition: 'equal', state: false },
    loading: { value: 0, condition: 'equal', state: false },
  }
}
