import type { Transaction, TransactionsContainer } from "@/types/types";

//TODO Write beter
export default async function getTransactions(cardId: string, amountFilterValue: string = '0'): Promise<Transaction[]> {
  if (!cardId) {
    throw new Error("Invalid card selected")
  }
  
  const amountAsNumber = Number(amountFilterValue)

  if (isNaN(amountAsNumber)) throw new Error("Invalid filter amount")

  const transactionsModule = await import('../data/transactions.json' as any)
  const transactionsContainer : TransactionsContainer[] = transactionsModule.default

  if (transactionsContainer[cardId]) return transactionsContainer[cardId].filter((item: Transaction) => item.amount >= Number(amountAsNumber))

  return []
}
