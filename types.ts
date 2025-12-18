export interface CardData {
  cardNumber: string;
  holderName: string;
  expiryDate: string; // Format YYYY-MM from input type="month"
  cvv: string;
}

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard' | 'unknown';

export enum CardType {
  Visa = 'visa',
  Mastercard = 'mastercard',
  Amex = 'amex',
  Elo = 'elo',
  Hipercard = 'hipercard',
  Unknown = 'unknown'
}