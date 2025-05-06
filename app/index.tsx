import { Card } from '@/app/components/Card';
import { PokemonCard } from '@/app/components/pokemon/PokemonCard';
import { RootView } from '@/app/components/RootView';
import { Row } from '@/app/components/Row';
import { SearchBar } from '@/app/components/SearchBar';
import { SortButton } from '@/app/components/SortButton';
import { ThemedText } from '@/app/components/ThemedText';
import { getPokemonId } from '@/functions/pokemons';
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

export default function App() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery('/pokemon?limit=201');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'id' | 'name'>('id');
  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((r: { name: any; url: string }) => ({
        name: r.name,
        id: getPokemonId(r.url),
      }))
    ) ?? [];
  const filteredPokemons = [
    ...(search
      ? pokemons.filter(
          (p) =>
            p.name.includes(search.toLowerCase()) || p.id.toString() === search
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
  return (
    <RootView>
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
      <Row gap={16} style={{ paddingHorizontal: 12 }}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          columnWrapperStyle={[styles.gridGap, styles.list]}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 4,
  //   gap: 16,
  // },
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
