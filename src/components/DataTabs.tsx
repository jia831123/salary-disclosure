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
  // const [activeKey, setActiveKey] = useState(items[0].key)

  // const newTabIndex = useRef(0)

  // const onChange = (newActiveKey: string) => {
  //   setActiveKey(newActiveKey)
  // }

  // const add = () => {
  //   const newActiveKey = `newTab${newTabIndex.current++}`
  //   const newPanes = [...items]
  //   newPanes.push({ label: 'New Tab', children: <DataTabsForm></DataTabsForm>, key: newActiveKey })
  //   setItems(newPanes)
  //   setActiveKey(newActiveKey)
  // }

  //const remove = (targetKey: TargetKey) => {
  // let newActiveKey = activeKey
  // let lastIndex = -1
  // items.forEach((item, i) => {
  //   if (item.key === targetKey) {
  //     lastIndex = i - 1
  //   }
  // })
  // const newPanes = items.filter((item) => item.key !== targetKey)
  // if (newPanes.length && newActiveKey === targetKey) {
  //   if (lastIndex >= 0) {
  //     newActiveKey = newPanes[lastIndex].key
  //   } else {
  //     newActiveKey = newPanes[0].key
  //   }
  // }
  // setItems(newPanes)
  // setActiveKey(newActiveKey)
  //}

  // const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
  //   if (action === 'add') {
  //     add()
  //   } else {
  //     remove(targetKey)
  //   }
  // }

  return <Tabs type="editable-card" items={items} />
}
