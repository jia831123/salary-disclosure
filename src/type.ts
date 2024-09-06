export interface FilterConfig {
  name: string
  componyName: {
    value: string
    condition: 'include'
    state: boolean
  }
  allSalary: {
    value: number
    condition: 'equal' | 'less' | 'greater'
    state: boolean
  }
  salary: {
    value: number
    condition: 'equal' | 'less' | 'greater'
    state: boolean
  }
  bonus: {
    value: number
    condition: 'equal' | 'less' | 'greater'
    state: boolean
  }
  rank: {
    value: string
    condition: 'include'
    state: boolean
  }
  position: {
    value: string
    condition: 'include'
    state: boolean
  }
  happy: {
    value: number
    condition: 'equal' | 'less' | 'greater'
    state: boolean
  }
  loading: {
    value: number
    condition: 'equal' | 'less' | 'greater'
    state: boolean
  }
}
