import {Container, Title} from './styles'
import {IFilterProps} from './data'

export function Filter({title, isActive = false, ...rest}: IFilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
