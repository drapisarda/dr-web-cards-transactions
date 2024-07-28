import type { Transaction, TransactionsContainer } from "@/types/types";
import axios from "axios";
import fakeApiLatency from "./fakeApiLatency";

/*
 * @deprecated this has to be fixed to fetch from a real API
 */
export default async function getTransactions(cardId: string, amountFilterValue: number = 0): Promise<Transaction[]> {

  await fakeApiLatency(2000);

  try {
    // WARNING this should be a call to a real backed-end API, the cardId parameter is here to simulate this.
    // the real filter is actually implemented in this composable function
    const response = await axios.get(`/data/transactions_extended.json?cardId=${cardId}`);
    const transactionsContainer: TransactionsContainer = response.data;

    // WARNING this if won't happen on real data, but here we simulate the real filter
    if (cardId in transactionsContainer) {
      return transactionsContainer[cardId].filter((item: Transaction) => item.amount >= amountFilterValue);
    } else {
      console.warn(`Card ID "${cardId}" not found in transactions`);
      return [];
    }
  } catch (error: unknown) {
    throw new Error(`Error fetching transactions for card ${cardId}: "${error.message}"`);
  }
}