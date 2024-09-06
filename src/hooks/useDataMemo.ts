import { FilterConfig } from '../type'
import { SalaryData } from './useGoogleAPI'
import { useMemo } from 'react'
function applyCondition(itemValue: number, filterValue: number, condition: 'equal' | 'less' | 'greater'): boolean {
  switch (condition) {
    case 'equal':
      return itemValue === filterValue
    case 'less':
      return itemValue < filterValue
    case 'greater':
      return itemValue > filterValue
    default:
      return false
  }
}

export function useDataMemo(data: SalaryData[], configs: FilterConfig[], index: number) {
  const config = useMemo(() => configs[index], [configs, index])
  const dataMemo = useMemo(() => {
    if (!data) return []
    return data.filter((item) => {
      // 遍歷每個 filterConfig 屬性，根據 state 和 condition 決定是否過濾
      if (config.componyName.state) {
        if (!item.companyName.includes(config.componyName.value)) return false
      }

      if (config.allSalary.state) {
        if (!applyCondition(Number(item.allSalary), config.allSalary.value, config.allSalary.condition)) return false
      }

      if (config.salary.state) {
        if (!applyCondition(Number(item.salary), config.salary.value, config.salary.condition)) return false
      }

      if (config.bonus.state) {
        if (!applyCondition(Number(item.bonus), config.bonus.value, config.bonus.condition)) return false
      }

      if (config.rank.state) {
        if (!item.rank.includes(config.rank.value)) return false
      }

      if (config.position.state) {
        if (!item.position.includes(config.position.value)) return false
      }

      if (config.happy.state) {
        if (!applyCondition(Number(item.happy), config.happy.value, config.happy.condition)) return false
      }

      if (config.loading.state) {
        if (!applyCondition(Number(item.loading), config.loading.value, config.loading.condition)) return false
      }

      return true
    })
  }, [
    data,
    config.allSalary.state,
    config.bonus.state,
    config.componyName.state,
    config.happy.state,
    config.loading.state,
    config.position.state,
    config.rank.state,
    config.salary.state,
  ])
  return { dataMemo }
}
