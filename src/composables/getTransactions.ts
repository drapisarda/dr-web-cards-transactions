import type { Transaction, TransactionsContainer } from "@/types/types";

//TODO Write beter
export default async function getTransactions(cardId: string, amountFilterValue: number = 0): Promise<Transaction[]> {
  if (!cardId) {
    throw new Error("Invalid card selected")
  }
  
  const transactionsModule = await import('../data/transactions_extended.json' as any)
  const transactionsContainer : TransactionsContainer = transactionsModule.default

  if (cardId in transactionsContainer) {
    return transactionsContainer[cardId].filter((item: Transaction) => item.amount >= amountFilterValue)
  }

  return []
}
