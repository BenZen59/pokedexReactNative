import { Card } from '@/app/components/Card';
import { PokemonSpec } from '@/app/components/pokemon/PokemonSpec';
import { PokemonStat } from '@/app/components/pokemon/PokemonStat';
import { PokemonType } from '@/app/components/pokemon/PokemonType';
import { RootView } from '@/app/components/RootView';
import { Row } from '@/app/components/Row';
import { ThemedText } from '@/app/components/ThemedText';
import { Colors } from '@/constants/Colors';
import {
  formatSize,
  formatWeight,
  getPokemonArtwork,
  getPokemonMoves,
} from '@/functions/pokemons';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import { MoveDetail } from '@/types/moves';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MovesTable from '../components/MovesTable';

export default function Pokemon() {
  const [moveDetails, setMoveDetails] = useState<MoveDetail[]>([]);
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', { id: params.id });
  const { data: species } = useFetchQuery('/pokemon-species/[id]', {
    id: params.id,
  });
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === 'en')
    ?.flavor_text.replaceAll('\n', '.');

  const moves = pokemon?.moves;
  // console.log(moves); // tableau de détails complets des moves

  useEffect(() => {
    if (moves) {
      getPokemonMoves(moves).then(setMoveDetails);
    }
  }, [moves]);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <RootView backgroundColor={colorType}>
        <View>
          {' '}
          <Image
            style={styles.pokeball}
            source={require('@/assets/images/pokeball_big.png')}
            width={208}
            height={208}
          />
          <Row style={styles.header}>
            <Pressable onPress={router.back}>
              <Row gap={8}>
                <Image
                  source={require('@/assets/images/back.png')}
                  width={32}
                  height={32}
                />
                <ThemedText
                  color='grayWhite'
                  variant='headline'
                  style={{ textTransform: 'capitalize' }}
                >
                  {pokemon?.name}
                </ThemedText>
              </Row>
            </Pressable>

            <ThemedText color='grayWhite' variant='subtitle2'>
              #{params.id.padStart(3, '0')}
            </ThemedText>
          </Row>
          <View style={styles.body}>
            <Image
              source={{
                uri: getPokemonArtwork(params.id),
              }}
              style={[styles.artwork, { width: 200, height: 200 }]}
            />
            <Card style={styles.card}>
              <Row gap={16}>
                {types.map((type) => (
                  <PokemonType name={type.type.name} key={type.type.name} />
                ))}
              </Row>{' '}
              <ThemedText
                variant='subtitle1'
                style={{ color: colorType, paddingTop: 20 }}
              >
                About
              </ThemedText>
              <Row style={{ marginBottom: 24, marginTop: 24 }}>
                <PokemonSpec
                  style={{
                    borderStyle: 'solid',
                    borderRightWidth: 1,
                    borderColor: colors.grayLight,
                  }}
                  title={formatWeight(pokemon?.weight)}
                  description='Weight'
                  image={require('@/assets/images/weight.png')}
                />
                <PokemonSpec
                  style={{
                    borderStyle: 'solid',
                    borderRightWidth: 1,
                    borderColor: colors.grayLight,
                  }}
                  title={formatSize(pokemon?.height)}
                  description='Size'
                  image={require('@/assets/images/height.png')}
                />
              </Row>
              <ThemedText>{bio}</ThemedText>
              <ThemedText variant='subtitle1' style={{ color: colorType }}>
                Base Stats
              </ThemedText>
              <View
                style={{
                  justifyContent: 'space-between',
                  width: 320,
                }}
              >
                {pokemon?.stats.map((stats) => (
                  <PokemonStat
                    key={stats.stat.name}
                    name={stats.stat.name}
                    value={stats.base_stat}
                    color={colorType}
                  />
                ))}
              </View>
              <View style={{ flex: 1, padding: 16 }}>
                {moveDetails.length > 0 && <MovesTable moves={moveDetails} />}
              </View>
            </Card>
          </View>
        </View>
      </RootView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: 'space-between',
  },
  pokeball: {
    opacity: 0.1,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  artwork: {
    alignSelf: 'center',
    position: 'absolute',
    top: -140,
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    alignItems: 'center',
  },
});
