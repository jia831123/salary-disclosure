import { Table } from 'antd'
import type { TableProps } from 'antd'
import { SalaryData } from '../hooks/useGoogleAPI'

export function DataTable({ data }: { data: SalaryData[] }) {
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

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '時間戳記',
      dataIndex: 'timeState',
      key: 'timeState',
      width: 120,
      fixed: 'left',
      sorter: true,
    },
    {
      title: '公司名稱',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 120,
      fixed: 'left',
      sorter: true,
    },
    {
      title: '職務',
      dataIndex: 'rank',
      key: 'rank',
      width: 100,
      sorter: true,
    },
    {
      title: '職級',
      dataIndex: 'position',
      key: 'position',
      width: 100,
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
    },
    {
      title: 'Loading',
      dataIndex: 'loading',
      key: 'loading',
      width: 100,
      sorter: true,
    },
    {
      title: '心得 是否推薦 面試相關....etc',
      dataIndex: 'other',
      key: 'other',
      width: 300,
    },
  ]

  return (
    <Table
      className="h-full w-full overflow-auto"
      columns={columns}
      dataSource={data}
      rowKey={'index'}
      pagination={false}
      scroll={{ x: 1500, y: 1000 }}
    />
  )
}
