import type { Card, Transaction } from "@/types/types";

export async function getCards(): Promise<Card[]> {
  const cards = await (await import("../data/cards.json")).default;
  return cards;
}

export async function getTransactions(cardId: string): Promise<Card[]> {
  const transactions: Record<string, Transaction[]> = await (
    await import("../data/transactions.json")
  ).default;

  if (transactions[cardId]) {
    return transactions[cardId];
  }

  throw new Error("cardId not found");
}
