// components/MovesTable.tsx
import { MoveDetail } from '@/types/moves';
import { FlatList, StyleSheet, Text, View } from 'react-native';

function MoveRow({ move, index }: { move: MoveDetail; index: number }) {
  const description = move.effect_entries.find(
    (entry) => entry.language.name === 'en'
  )?.effect;

  const rowStyle = [
    styles.row,
    index % 2 === 0 && { backgroundColor: '#f9f9f9' },
  ];

  return (
    <View style={rowStyle}>
      <Text style={styles.cell}>{move.name}</Text>
      <Text style={styles.cell}>{move.power ?? '-'}</Text>
      <Text style={styles.cell}>{move.accuracy ?? '-'}</Text>
      <Text style={styles.cell}>{move.pp}</Text>
      <Text style={styles.cell}>{move.type.name}</Text>
      <Text style={styles.cell}>{move.damage_class.name}</Text>
      <Text style={[styles.cell, styles.description]} numberOfLines={3}>
        {description ?? 'No description'}
      </Text>
    </View>
  );
}

export default function MovesTable({ moves }: { moves: MoveDetail[] }) {
  return (
    <FlatList
      data={moves}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => <MoveRow move={item} index={index} />}
      ListHeaderComponent={
        <View style={[styles.row, styles.header]}>
          {[
            'Name',
            'Power',
            'Accuracy',
            'PP',
            'Type',
            'Class',
            'Description',
          ].map((h) => (
            <Text key={h} style={[styles.cell, styles.headerText]}>
              {h}
            </Text>
          ))}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderColor: '#bbb',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 13,
    color: '#222',
    borderWidth: 1,
    borderColor: '#000',
  },
  description: {
    flex: 2,
    fontSize: 12,
    color: '#444',
  },
});
