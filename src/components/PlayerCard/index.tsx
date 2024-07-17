import {ButtonIcon} from '@components/ButtonIcon'
import {Container, Icon, Name} from './styles'
import {IPlayerCardProps} from './data'

export function PlayerCard({name, onRemove}: IPlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  )
}
