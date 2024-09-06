import { useEffect, useMemo, useState } from 'react'
import './style/reset.css'
import './App.css'
import useGoogleApi from './hooks/useGoogleAPI'
import DataTable from './components/DataTable'
import { Layout } from 'antd'
import { DataTabs } from './components/DataTabs'
import { useConfigService } from './server/localStorage/useConfigService'
import { useDataMemo } from './hooks/useDataMemo'

const App = () => {
  const { Header, Sider, Content } = Layout

  const { getDataFromGoogleSheets, init, transformDataToJson } = useGoogleApi()
  const [data, setData] = useState<any>()
  const { configs, setConfigs: updateConfigs } = useConfigService()
  const { dataMemo } = useDataMemo(data, configs, 0)
  useEffect(() => {
    init().then(async () => {
      const data = await getDataFromGoogleSheets().then((data) => transformDataToJson(data))
      setData(data)
    })
  }, [])
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  }

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'rgb(255, 255, 255)',
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100vh-64px)',
  }
  return (
    <>
      <Header style={headerStyle}>
        純軟薪水分享 好用版{' '}
        <a
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1GMYKVBxRlMv6oNVNzpXYoLUSyT8ZnLEjGcRbn0b4KsA/edit?gid=788239997#gid=788239997"
        >
          (資料來源)
        </a>
      </Header>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <DataTabs configs={configs} updateConfigs={updateConfigs}></DataTabs>
        </Sider>
        <Content style={contentStyle}>
          <DataTable data={dataMemo}></DataTable>
        </Content>
      </Layout>
    </>
  )
}

export default App
