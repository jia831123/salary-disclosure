import { useEffect, useState, createContext } from 'react'
import './style/reset.css'
import './App.css'
import './index.css'
import useGoogleApi from './hooks/useGoogleAPI'
import DataTable from './components/DataTable'
import { Button, ConfigProvider, Drawer, Flex, Layout, theme } from 'antd'
import { DataTabs } from './components/DataTabs'
import { useConfigService } from './server/localStorage/useConfigService'
import { useDataMemo } from './hooks/useDataMemo'
import { useMediaQuery } from './hooks/useMediaQuery'
import { AlignCenterOutlined } from '@ant-design/icons'

export const MdContext = createContext<boolean>(false)
const App = () => {
  const { Header, Sider, Content } = Layout

  const { getDataFromGoogleSheets, init, transformDataToJson, isLoading } = useGoogleApi()
  const [data, setData] = useState<any>()
  const { configs, setConfigs: updateConfigs } = useConfigService()
  const { dataMemo } = useDataMemo(data, configs, 0)
  const [isShowDrawer, setShowDrawer] = useState(false)
  const md = useMediaQuery('(min-width: 1024px)')
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
    backgroundColor: 'black',
    padding: '0px',
  }

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'black',
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100% - 64px)',
  }
  return (
    <div className="scroll-container h-full">
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm: theme.darkAlgorithm,

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <MdContext.Provider value={md}>
          <Header style={headerStyle}>
            <Flex align="center" gap={'3rem'}>
              {!md && (
                <Button
                  className="m-1"
                  onClick={() => setShowDrawer(true)}
                  ghost
                  icon={<AlignCenterOutlined />}
                ></Button>
              )}
              <div className="grow">
                純軟薪水分享 加強版
                <a
                  target="_blank"
                  href="https://docs.google.com/spreadsheets/d/1GMYKVBxRlMv6oNVNzpXYoLUSyT8ZnLEjGcRbn0b4KsA/edit?gid=788239997#gid=788239997"
                >
                  (資料來源)
                </a>
              </div>
            </Flex>
          </Header>
          <Layout style={layoutStyle}>
            {md && (
              <Sider width="25%" style={siderStyle}>
                <DataTabs configs={configs} updateConfigs={updateConfigs}></DataTabs>
              </Sider>
            )}
            <Content style={contentStyle}>
              <DataTable data={dataMemo} dataLoading={isLoading} config={configs[0]}></DataTable>
            </Content>
          </Layout>
          <Drawer placement="left" onClose={() => setShowDrawer(false)} open={isShowDrawer}>
            <DataTabs configs={configs} updateConfigs={updateConfigs}></DataTabs>
          </Drawer>
        </MdContext.Provider>
      </ConfigProvider>
    </div>
  )
}

export default App
