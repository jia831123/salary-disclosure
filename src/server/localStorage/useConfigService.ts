import { useEffect, useState } from 'react'
import { FilterConfig } from '../../type'
import { getDefaultFilterConfig } from '../../hooks/useDataTransfer'

export function useConfigService() {
  const [configs, setConfigs] = useState<FilterConfig[]>(() => {
    const dataFromLocalStorage = localStorage.getItem('configs')
    return dataFromLocalStorage !== null ? JSON.parse(dataFromLocalStorage) : [getDefaultFilterConfig()]
  })
  useEffect(() => {
    localStorage.setItem('configs', JSON.stringify(configs))
  }, [configs])

  return {
    configs,
    setConfigs,
  }
}
