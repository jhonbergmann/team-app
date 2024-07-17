import {Container, Icon, Title} from './styles'
import {IGroupCardProps} from './data'

export function GroupCard({title, ...rest}: IGroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
