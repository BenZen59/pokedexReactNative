import { StyleSheet, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  gap?: number;
};
export function Row({ style, gap, ...rest }: Props) {
  return (
    <View
      style={[styles.row, style, gap ? { gap: gap } : undefined]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
