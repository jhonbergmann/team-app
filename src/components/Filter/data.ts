import {TouchableOpacityProps} from 'react-native'

export type IFilterStyleProps = {
  isActive?: boolean
}

export type IFilterProps = TouchableOpacityProps &
  IFilterStyleProps & {
    title: string
  }
