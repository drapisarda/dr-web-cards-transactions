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

export interface TransactionsContainer {
  [key: string]: Transaction[];
}
// TODO for future implementation
// export type CardType = 'private' | 'business' | 'hyper-business'
