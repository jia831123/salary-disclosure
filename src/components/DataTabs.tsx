import { Tabs } from 'antd'
import { useMemo } from 'react'
import { DataTabsForm } from './DataTabsForm'
import { FilterConfig } from '../type'

function transferConfigsToItems(data: FilterConfig[], updateConfigs: Function) {
  return data.map((each, index) => ({
    label: each.name,
    children: (
      <DataTabsForm
        config={each}
        updateConfig={(config) => {
          updateConfigs([...data].map((each, _index) => (index === _index ? config : each)))
        }}
      ></DataTabsForm>
    ),
    key: index,
    closable: false,
  }))
}
export function DataTabs({
  configs,
  updateConfigs,
}: {
  configs: FilterConfig[]
  updateConfigs: (data: FilterConfig[]) => void
}) {
  const items = useMemo<any>(() => {
    return transferConfigsToItems(configs, updateConfigs)
  }, [configs])
  return <Tabs type="editable-card" hideAdd items={items} />
}
