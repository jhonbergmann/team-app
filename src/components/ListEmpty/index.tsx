import {IListEmptyProps} from './data'
import {Container, Message} from './styles'

export function ListEmpty({message}: IListEmptyProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
