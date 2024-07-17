import {Container, Icon} from './styles'
import {IButtonIconProps} from './data'

export function ButtonIcon({icon, type = 'PRIMARY', ...rest}: IButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
