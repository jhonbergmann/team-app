import {TouchableOpacityProps} from 'react-native'

export type IButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

export type IButtonContainerProps = {
  type: IButtonTypeStyleProps
}

export type IButtonProps = TouchableOpacityProps & {
  title: string
  type?: IButtonTypeStyleProps
}
