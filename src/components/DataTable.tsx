import type { TableProps } from 'antd'
import { SalaryData } from '../hooks/useGoogleAPI'
import { Button, Table, Tag } from 'antd'
import { useContext, useMemo, useRef } from 'react'
import { useDataTransfer } from '../hooks/useDataTransfer'
import React from 'react'
import { convertToDateFormat, get104Href, getQollieHref } from '../uitls'
import { FilterConfig } from '../type'
import { MdContext } from '../App'

interface DataType {
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
}

export default React.memo(function DataTable({
  data,
  dataLoading,
  config,
}: {
  data: SalaryData[]
  config: FilterConfig
  dataLoading?: boolean
}) {
  const md = useContext(MdContext)
  const dataForTransfer = useMemo(() => useDataTransfer(data), [data])
  const tableRef = useRef<any>(null)
  const columns = useMemo<TableProps<DataType>['columns']>(() => {
    const originData: TableProps<DataType>['columns'] = [
      {
        title: '時間戳記',
        dataIndex: 'timeState',
        key: 'timeState',
        width: 120,
        fixed: 'left',
        sorter: (a, b) => {
          let aTimeStr = a.timeState ? convertToDateFormat(a.timeState) : '0'
          let bTimeStr = b.timeState ? convertToDateFormat(b.timeState) : '0'
          return new Date(aTimeStr).getTime() - new Date(bTimeStr).getTime()
        },
      },
      {
        title: '公司名稱',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 120,
        fixed: 'left',
        sorter: true,
        className: 'bg-red',
        render: (_, { companyName }) => {
          return (
            <div>
              <div>{companyName}</div>
              <div className="flex justify-center">
                <Button
                  type="text"
                  href={get104Href(companyName)}
                  target="_blank"
                  size="small"
                  shape="circle"
                  children={<img height={'20px'} width={'20px'} src="../public/104.ico" />}
                />
                <Button
                  href={getQollieHref(companyName)}
                  size="small"
                  target="_blank"
                  shape="circle"
                  children={<img height={'16px'} width={'16px'} src="../public/qollie.ico" />}
                />
              </div>
            </div>
          )
        },
      },
      {
        title: '職務',
        dataIndex: 'rank',
        key: 'rank',
        width: 200,
        sorter: true,
        render: (_, { rank }) => {
          let name =
            rank.includes('前端') || rank.includes('frontend')
              ? 'frontend'
              : rank.includes('後端') || rank.includes('backend')
              ? 'backend'
              : rank
          let color =
            rank.includes('前端') || rank.includes('frontend')
              ? 'blue'
              : rank.includes('後端') || rank.includes('backend')
              ? 'yellow'
              : 'gray'
          return <>{<Tag color={color}>{name}</Tag>}</>
        },
      },
      {
        title: '職級',
        dataIndex: 'position',
        key: 'position',
        width: 150,
      },
      {
        title: '相關年資',
        dataIndex: 'relateJobExperience',
        key: 'relateJobExperience',
        width: 120,
        sorter: (a, b) => Number(a.relateJobExperience) - Number(b.relateJobExperience),
      },
      {
        title: '現職年資',
        dataIndex: 'currentJobExperience',
        key: 'currentJobExperience',
        width: 120,
        sorter: (a, b) => Number(a.currentJobExperience) - Number(b.currentJobExperience),
      },
      {
        title: '月底薪(幾萬)',
        dataIndex: 'salary',
        key: 'salary',
        width: 100,
        sorter: (a, b) => Number(a.salary) - Number(b.salary),
      },
      {
        title: 'Bonus (幾個月)',
        dataIndex: 'bonus',
        key: 'bonus',
        width: 150,
        sorter: (a, b) => Number(a.bonus) - Number(b.bonus),
      },
      {
        title: '總年薪(多萬) 分紅+年終+底薪',
        dataIndex: 'allSalary',
        key: 'allSalary',
        width: 150,
        sorter: (a, b) => Number(a.allSalary) - Number(b.allSalary),
      },
      {
        title: '每日平均工時',
        dataIndex: 'averageTimePeerDay',
        key: 'averageTimePeerDay',
        width: 100,
        sorter: (a, b) => Number(a.averageTimePeerDay) - Number(b.averageTimePeerDay),
      },
      {
        title: '每月加班',
        dataIndex: 'overTimeEveryMonth',
        key: 'overTimeEveryMonth',
        width: 100,
        sorter: (a, b) => Number(a.overTimeEveryMonth) - Number(b.overTimeEveryMonth),
      },
      {
        title: '加班頻率',
        dataIndex: 'overtimeFrequency',
        key: 'overtimeFrequency',
        width: 100,
        sorter: (a, b) => Number(a.overtimeFrequency) - Number(b.overtimeFrequency),
      },
      {
        title: '爽度(1~5) 5最爽',
        dataIndex: 'happy',
        key: 'happy',
        width: 100,
        sorter: (a, b) => Number(a.happy) - Number(b.happy),
        render: (_, { happy }) => {
          let color = Number(happy) === 1 ? 'red' : Number(happy) < 4 ? 'yellow' : 'green'
          return <Tag color={color}>{happy}</Tag>
        },
      },
      {
        title: 'Loading',
        dataIndex: 'loading',
        key: 'loading',
        width: 100,
        sorter: (a, b) => Number(a.loading) - Number(b.loading),
        render: (_, { loading }) => {
          let color = Number(loading) === 5 ? 'red' : Number(loading) > 3 ? 'yellow' : 'green'
          return <Tag color={color}>{loading}</Tag>
        },
      },
      {
        title: '心得 是否推薦 面試相關....etc',
        dataIndex: 'other',
        key: 'other',
        width: 300,
      },
    ]
    return originData
      .filter((each) => {
        return config.cols.concat(['companyName', 'timeState']).includes(each.key as string)
      })
      .filter((e) => (!md ? !md && e.key !== 'timeState' : true))
  }, [config])
  console.log('Table Render')
  return (
    <Table
      ref={tableRef}
      virtual
      bordered
      loading={dataLoading}
      className="w-full h-full overflow-auto"
      columns={columns}
      dataSource={dataForTransfer}
      rowKey={'index'}
      pagination={false}
      scroll={{ x: 1500, y: 600 }}
    />
  )
})
