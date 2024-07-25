// import { cards } from "./data/cards";
// import { transactions } from "./data/transactions";
export interface Card {
  id: string;
  description: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
}

export type CardType = 'private' | 'business' | 'hyper-business'
