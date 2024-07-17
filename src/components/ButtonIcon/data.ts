import {TouchableOpacityProps} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export type IButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'

export type IIconProps = {
  type: IButtonIconTypeStyleProps
}

export type IButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: IButtonIconTypeStyleProps
}
