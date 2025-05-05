import { useThemeColors } from '@/hooks/useThemeColors';
import { View, type ViewProps } from 'react-native';
type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[style, { backgroundColor: colors.grayWhite }]} {...rest} />
  );
}
