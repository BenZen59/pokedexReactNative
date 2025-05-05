import { Card } from '@/app/components/Card';
import { Row } from '@/app/components/Row';
import { SearchBar } from '@/app/components/SearchBar';
import { ThemedText } from '@/app/components/ThemedText';
import { getPokemonId } from '@/functions/pokemons';
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonCard } from './components/pokemon/PokemonCard';

export default function App() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery('/pokemon?limit=201');
  const [search, setSearch] = useState('');
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];
  const filteredPokemons = search
    ? pokemons.filter(
        (p) =>
          p.name.includes(search.toLowerCase()) ||
          getPokemonId(p.url).toString() === search
      )
    : pokemons;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <Row style={styles.header} gap={16}>
        <Image
          source={require('@/assets/images/pokeball.png')}
          width={24}
          height={24}
        />
        <ThemedText variant='headline' color='grayLight'>
          Pokédex
        </ThemedText>
      </Row>
      <Row>
        <SearchBar value={search} onChange={setSearch} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          columnWrapperStyle={(styles.gridGap, styles.list)}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.url}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    gap: 16,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: { flex: 1, marginTop: 16 },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
