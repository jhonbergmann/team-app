import {useState, useCallback} from 'react'
import {Alert, FlatList} from 'react-native'
import {useNavigation, useFocusEffect} from '@react-navigation/native'

import {GroupCard, Header, Highlight, ListEmpty, Button, Loading, Conditional} from '@/components'
import {groupsGetAll} from '@storage/group'
import {Container} from './styles'

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com sua turma" />
      <Conditional render={isLoading}>
        <Loading />
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({item}) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
        />
      </Conditional>
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
