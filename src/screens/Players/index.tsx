import {useState, useEffect, useRef} from 'react'
import {FlatList, Alert, TextInput} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'

import {
  Header,
  Highlight,
  ButtonIcon,
  Filter,
  Input,
  Loading,
  PlayerCard,
  ListEmpty,
  Button,
  Conditional,
} from '@/components'
import {PlayerStorageDTO, playerAddByGroup, playersGetByGroupAndTeam, playerRemoveByGroup} from '@storage/player'
import {groupRemoveByName} from '@storage/group'
import {AppError} from '@utils/AppError'
import {Container, Form, HeaderList, NumberOfPlayers} from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState<string>('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()

  const {group} = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
        return
      }
      Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover Grupo', 'Não foi possível remover o grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover a turma?', [
      {text: 'Não', style: 'cancel'},
      {text: 'Sim', onPress: () => groupRemove()},
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({item}) => <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <Conditional render={isLoading}>
        <Loading />
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />}
          ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && {flex: 1}]}
        />
      </Conditional>
      <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove} />
    </Container>
  )
}
