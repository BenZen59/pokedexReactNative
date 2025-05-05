import { useThemeColors } from '@/hooks/useThemeColors';
import { Image, Pressable, StyleSheet, View } from 'react-native';

type Props = {
  value: 'id' | 'name';
  onChange: (v: 'id' | 'name') => void;
};
export function SortButton({ value, onChange }: Props) {
  const colors = useThemeColors();
  const onButtonPress = () => {};
  return (
    <Pressable onPress={onButtonPress}>
      <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
        <Image
          source={
            value === 'id'
              ? require('@/assets/images/number.png')
              : require('@/assets/images/alpha.png')
          }
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
