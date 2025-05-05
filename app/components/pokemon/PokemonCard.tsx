import { Card } from '@/app/components/Card';
import { ThemedText } from '@/app/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, type ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};
export function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: '/pokemon/[id]', params: { id: id } }} asChild>
      <Pressable>
        <Card style={[style, styles.card]}>
          <ThemedText style={styles.id} variant='caption' color='grayMedium'>
            #{id.toString().padStart(3, '0')}
          </ThemedText>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }}
            style={{ width: 110, height: 110, zIndex: 1 }}
          />
          <ThemedText>{name}</ThemedText>
          {/* <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          /> */}
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    alignItems: 'center',
    padding: 4,
    zIndex: 1,
  },
  id: {
    alignSelf: 'flex-end',
  },
  // shadow: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   borderRadius: 7,
  //   height: 120,
  //   zIndex: -1,
  // },
});
