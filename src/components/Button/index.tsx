import {Container, Title} from './styles'
import {IButtonProps} from './data'

export function Button({title, type = 'PRIMARY', ...rest}: IButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
