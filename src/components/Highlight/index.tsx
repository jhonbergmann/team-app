import {IHighlightProps} from './data'
import {Container, Subtitle, Title} from './styles'

export function Highlight({title, subtitle}: IHighlightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
