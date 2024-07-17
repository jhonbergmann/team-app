import {useTheme} from 'styled-components/native'

import {Container} from './styles'
import {IInputProps} from './data'

export function Input({inputRef, ...rest}: IInputProps) {
  const {COLORS} = useTheme()

  return <Container ref={inputRef} placeholderTextColor={COLORS.GRAY_300} {...rest} />
}
