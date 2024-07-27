import type { Transaction, TransactionsContainer } from "@/types/types";
import axios from "axios";

export default async function getTransactions(cardId: string, amountFilterValue: number = 0): Promise<Transaction[]> {
  if (!cardId) {
    throw new Error("Invalid card selected");
  }

  try {
    const response = await axios.get('/data/transactions_extended.json');
    const transactionsContainer: TransactionsContainer = response.data;

    if (cardId in transactionsContainer) {
      return transactionsContainer[cardId].filter((item: Transaction) => item.amount >= amountFilterValue);
    } else {
      console.warn(`Card ID "${cardId}" not found in transactions`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}