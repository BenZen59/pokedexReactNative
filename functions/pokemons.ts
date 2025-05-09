export function getPokemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10);
}

export function getPokemonArtwork(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function getPokemonMoves(
  moves: { move: { name: string; url: string } }[]
) {
  try {
    const moveUrls = moves.map((m) => m.move.url);

    const moveDetails = await Promise.all(
      moveUrls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur lors du fetch du move à l'URL: ${url}`);
        }
        return await response.json();
      })
    );

    return moveDetails;
  } catch (error) {
    console.error('Erreur lors de la récupération des moves:', error);
    return [];
  }
}

export function formatWeight(weight?: number): string {
  if (!weight) {
    return '';
  }
  return (weight / 10).toString().replace('.', ',') + ' kg';
}

export function formatSize(size?: number): string {
  if (!size) {
    return '';
  }
  return (size / 10).toString().replace('.', ',') + ' m';
}
