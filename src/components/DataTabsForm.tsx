import { Flex, Form, Input, InputNumber, Select, Switch } from 'antd'
import { FilterConfig } from '../type'

export function DataTabsForm({
  config,
  updateConfig,
}: {
  config: FilterConfig
  updateConfig: (data: FilterConfig) => void
}) {
  return (
    <Form
      className="p-3"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="公司">
        <Flex gap="middle" vertical={false}>
          <Input
            value={config?.componyName.value}
            onChange={(e) => {
              updateConfig({
                ...config,
                componyName: {
                  ...config.componyName,
                  value: e.target.value,
                },
              })
            }}
          />
          <Switch
            value={config?.componyName.state}
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            onChange={(e) =>
              updateConfig({
                ...config,
                componyName: {
                  ...config.componyName,
                  state: e,
                },
              })
            }
          />
        </Flex>
      </Form.Item>
      <Form.Item label="職務">
        <Flex gap="middle" vertical={false}>
          <Input
            value={config.rank.value}
            onChange={(e) =>
              updateConfig({
                ...config,
                rank: {
                  ...config.rank,
                  value: e.target.value,
                },
              })
            }
          />
          <Switch
            value={config?.rank.state}
            onChange={(state) =>
              updateConfig({
                ...config,
                rank: {
                  ...config.rank,
                  state,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
      <Form.Item label="職級">
        <Flex gap="middle" vertical={false}>
          <Input
            value={config.position.value}
            onChange={(e) =>
              updateConfig({
                ...config,
                position: {
                  ...config.position,
                  value: e.target.value,
                },
              })
            }
          />
          <Switch
            value={config?.position.state}
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            onChange={(state) =>
              updateConfig({
                ...config,
                position: {
                  ...config.position,
                  state,
                },
              })
            }
          />
        </Flex>
      </Form.Item>

      <Form.Item label="月薪(萬)">
        <Flex gap="middle" vertical={false}>
          <Flex vertical={false}>
            <Select
              style={{ width: '50%' }}
              value={config?.salary.condition}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  salary: {
                    ...config.salary,
                    condition: e,
                  },
                })
              }
              options={[
                {
                  label: '>',
                  value: 'greater',
                },
                {
                  label: '=',
                  value: 'equal',
                },
                {
                  label: '<',
                  value: 'less',
                },
              ]}
            ></Select>
            <InputNumber
              value={config?.salary.value}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  salary: {
                    ...config.salary,
                    value: e || 0,
                  },
                })
              }
            ></InputNumber>
          </Flex>
          <Switch
            value={config?.salary.state}
            onChange={(e) =>
              updateConfig({
                ...config,
                salary: {
                  ...config.salary,
                  state: e,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
      <Form.Item label="bonus">
        <Flex gap="middle" vertical={false}>
          <Flex vertical={false}>
            <Select
              style={{ width: '50%' }}
              value={config?.bonus.condition}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  bonus: {
                    ...config.bonus,
                    condition: e,
                  },
                })
              }
              options={[
                {
                  label: '>',
                  value: 'greater',
                },
                {
                  label: '=',
                  value: 'equal',
                },
                {
                  label: '<',
                  value: 'less',
                },
              ]}
            ></Select>
            <InputNumber
              value={config?.bonus.value}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  bonus: {
                    ...config.bonus,
                    value: e || 0,
                  },
                })
              }
            ></InputNumber>
          </Flex>
          <Switch
            value={config?.bonus.state}
            onChange={(e) =>
              updateConfig({
                ...config,
                bonus: {
                  ...config.bonus,
                  state: e,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
      <Form.Item label="年薪(萬)">
        <Flex gap="middle" vertical={false}>
          <Flex vertical={false}>
            <Select
              style={{ width: '50%' }}
              value={config?.allSalary.condition}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  allSalary: {
                    ...config.allSalary,
                    condition: e,
                  },
                })
              }
              options={[
                {
                  label: '>',
                  value: 'greater',
                },
                {
                  label: '=',
                  value: 'equal',
                },
                {
                  label: '<',
                  value: 'less',
                },
              ]}
            ></Select>
            <InputNumber
              value={config?.allSalary.value}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  allSalary: {
                    ...config.allSalary,
                    value: e || 0,
                  },
                })
              }
            ></InputNumber>
          </Flex>
          <Switch
            value={config?.allSalary.state}
            onChange={(e) =>
              updateConfig({
                ...config,
                allSalary: {
                  ...config.allSalary,
                  state: e,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
      <Form.Item label="爽度">
        <Flex gap="middle" vertical={false}>
          <Flex vertical={false}>
            <Select
              style={{ width: '50%' }}
              value={config?.happy.condition}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  happy: {
                    ...config.happy,
                    condition: e,
                  },
                })
              }
              options={[
                {
                  label: '>',
                  value: 'greater',
                },
                {
                  label: '=',
                  value: 'equal',
                },
                {
                  label: '<',
                  value: 'less',
                },
              ]}
            ></Select>
            <InputNumber
              value={config?.happy.value}
              max={5}
              min={0}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  happy: {
                    ...config.happy,
                    value: e || 0,
                  },
                })
              }
            ></InputNumber>
          </Flex>
          <Switch
            value={config.happy.state}
            onChange={(e) =>
              updateConfig({
                ...config,
                happy: {
                  ...config.happy,
                  state: e,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
      <Form.Item label="loading">
        <Flex gap="middle" vertical={false}>
          <Flex vertical={false}>
            <Select
              style={{ width: '50%' }}
              value={config?.loading.condition}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  loading: {
                    ...config.loading,
                    condition: e,
                  },
                })
              }
              options={[
                {
                  label: '>',
                  value: 'greater',
                },
                {
                  label: '=',
                  value: 'equal',
                },
                {
                  label: '<',
                  value: 'less',
                },
              ]}
            ></Select>
            <InputNumber
              value={config?.loading.value}
              max={5}
              min={0}
              onChange={(e) =>
                updateConfig({
                  ...config,
                  loading: {
                    ...config.loading,
                    value: e || 0,
                  },
                })
              }
            ></InputNumber>
          </Flex>
          <Switch
            value={config?.loading.state}
            onChange={(e) =>
              updateConfig({
                ...config,
                loading: {
                  ...config.loading,
                  state: e,
                },
              })
            }
            checkedChildren="開啟"
            unCheckedChildren="關閉"
            defaultChecked
          />
        </Flex>
      </Form.Item>
    </Form>
  )
}
