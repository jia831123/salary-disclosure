import { useEffect, useState } from 'react'
import './App.css'
import useGoogleApi from './hooks/useGoogleAPI'
import './style/reset.css'
import { DataTable } from './components/DataTable'
import { Flex, Layout } from 'antd'

const App = () => {
  const { Header, Footer, Sider, Content } = Layout

  const { getDataFromGoogleSheets, init, transformDataToJson } = useGoogleApi()
  const [data, setData] = useState<any>()
  useEffect(() => {
    init().then(async () => {
      const data = await getDataFromGoogleSheets().then((data) => transformDataToJson(data))
      setData(data)
      console.log(data)
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
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
  }
  return (
    <>
      <Header style={headerStyle}>純軟薪水分享</Header>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>
          <DataTable data={data}></DataTable>
        </Content>
      </Layout>
    </>
  )
}

export default App
