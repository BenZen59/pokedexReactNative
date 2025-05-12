// types/pokemon.ts
export type MoveDetail = {
  name: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  type: { name: string };
  damage_class: { name: string };
  effect_entries: { effect: string; language: { name: string } }[];
};
