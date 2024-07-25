import type { Card, Transaction } from "@/types/types";

export async function getCards(): Promise<Card[]> {
  const cards = await (await import("@/data/cards.json")).default;
  return cards;
}

//TODO Write beter
export async function getTransactions(cardId: string): Promise<Transaction[]> {
  const transactions: Record<string, Transaction[]> = await (
    await import("@/data/transactions.json")
  ).default;

  if (transactions[cardId]) {
    return transactions[cardId];
  }

  throw new Error("cardId not found");
}
