import type { TableProps } from 'antd'
import { SalaryData } from '../hooks/useGoogleAPI'
import { Table, Tag } from 'antd'
import { useMemo, useRef } from 'react'
import { useDataTransfer } from '../hooks/useDataTransfer'
import React from 'react'
import { convertToDateFormat, get104Href } from '../uitls'
import { FilterConfig } from '../type'

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
        render: (_, { companyName }) => {
          return (
            <a href={get104Href(companyName)} target="_blank">
              {companyName}
            </a>
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
        sorter: true,
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
        sorter: true,
      },
      {
        title: '每月加班',
        dataIndex: 'overTimeEveryMonth',
        key: 'overTimeEveryMonth',
        width: 100,
        sorter: true,
      },
      {
        title: '加班頻率',
        dataIndex: 'overtimeFrequency',
        key: 'overtimeFrequency',
        width: 100,
        sorter: true,
      },
      {
        title: '爽度(1~5) 5最爽',
        dataIndex: 'happy',
        key: 'happy',
        width: 100,
        sorter: true,
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
        sorter: true,
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
    return originData.filter((each) => {
      return config.cols.concat(['companyName', 'timeState']).includes(each.key as string)
    })
  }, [config])
  console.log('Table Render')
  return (
    <Table
      ref={tableRef}
      virtual
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
