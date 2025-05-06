import { Card } from '@/app/components/Card';
import { Radio } from '@/app/components/Radio';
import { Row } from '@/app/components/Row';
import { ThemedText } from '@/app/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

type Props = {
  value: 'id' | 'name';
  onChange: (v: 'id' | 'name') => void;
};

const options = [
  {
    label: 'Number',
    value: 'id',
  },
  { label: 'Name', value: 'name' },
] as const;

export function SortButton({ value, onChange }: Props) {
  const buttonRef = useRef<View>(null);
  const colors = useThemeColors();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>();
  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get('window').width - x - width,
      });
      setModalVisibility(true);
    });
  };
  const onClose = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === 'id'
                ? require('@/assets/images/number.png')
                : require('@/assets/images/alpha.png')
            }
          />
        </View>
      </Pressable>
      <Modal
        animationType='fade'
        transparent
        visible={isModalVisible}
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemedText
            style={styles.title}
            variant='subtitle2'
            color='grayWhite'
          >
            Sort by :
          </ThemedText>
          <Card style={styles.card}>
            {options.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <Row gap={8}>
                  <Radio checked={o.value === value} />
                  <ThemedText>{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popup: {
    position: 'absolute',
    elevation: 2,
    gap: 16,
    padding: 4,
    paddingTop: 16,
    top: 0,
    right: 0,
    width: 113,
    borderRadius: 12,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingLeft: 20,
    gap: 16,
    alignItems: 'flex-start',
  },
});
