import type { Card } from "@/types/types";
import axios from "axios";

/*
 * @deprecated this has to be fixed to fetch from a real API
 */
export async function getCards(): Promise<Card[]> {
  try {
    const response = await axios.get("/data/cards.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
}

/*
 * @deprecated this has to be fixed to fetch from a real API, possibly being combined with transactions
 */
export async function getCard(cardId: string): Promise<Card> {
  try {
    const cards = await getCards();
    const selectedCards = cards.filter((item: Card) => item.id === cardId);

    if (selectedCards.length === 0) {
      throw new Error(`Card with ID "${cardId}" not found`);
    }
    if (selectedCards.length > 1) {
      throw new Error(`Multiple cards found with ID "${cardId}"`);
    }

    return selectedCards[0];
  } catch (error) {
    console.error(`Error fetching card: "${cardId}"`, error);
    throw error;
  }
}
