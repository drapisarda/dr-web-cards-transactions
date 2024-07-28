import type { Transaction, TransactionsContainer } from "@/types/types";
import axios from "axios";

/*
 * @deprecated this has to be fixed to fetch from a real API
 */
export default async function getTransactions(cardId: string, amountFilterValue: number = 0): Promise<Transaction[]> {
  if (!cardId) {
    throw new Error("Invalid card selected");
  }

  try {
    // TODO this should be a call to a real backed-end API, the cardId parameter is here to simulate this.
    // the real filter is actually implemented in this composable function
    const response = await axios.get(`/data/transactions_extended.json?cardId=${cardId}`);
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