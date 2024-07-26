import type { Card } from "@/types/types";

export default async function getCards(): Promise<Card[]> {
  const cards = await import("@/data/cards.json" as any);
  return cards.default;
}

export async function getCard(cardId: string): Promise<Card> {
  const cards = await getCards()
  const selectedCards = cards.filter((item: Card) => item.id === cardId)

  if (!selectedCards || selectedCards.length === 0) throw new Error('Impossible to find card')
  if (selectedCards.length !== 1) throw new Error('Multiple cards.')

  return selectedCards[0]
}

