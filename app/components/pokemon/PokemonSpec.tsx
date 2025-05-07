import { Row } from '@/app/components/Row';
import { ThemedText } from '@/app/components/ThemedText';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
};

export function PokemonSpec({
  style,
  image,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[style, styles.root]} {...rest}>
      <Row style={styles.row}>
        {image && (
          <Image
            source={image}
            width={16}
            height={16}
            style={{ marginRight: 8 }}
          />
        )}
        <ThemedText>{title}</ThemedText>
      </Row>
      <ThemedText variant='caption' color='grayMedium'>
        {description}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
    width: 120,
  },
  row: {
    height: 32,
    alignItems: 'center',
  },
});
