import {useNavigation} from '@react-navigation/native'

import {BackButton, BackIcon, Container, Logo} from './styles'
import logoImg from '@assets/logo.png'
import {IHeaderProps} from './data'

export function Header({showBackButton = false}: IHeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
