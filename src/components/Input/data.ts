import {TextInput, TextInputProps} from 'react-native'

export type IInputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}
