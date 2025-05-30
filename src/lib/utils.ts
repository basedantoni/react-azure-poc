import {
  CAROWINDS_FULL_TICKET_PRICE,
  CAROWINDS_MEAL_TICKET_PRICE,
  FIESTA_TEXAS_FULL_TICKET_PRICE,
  FIESTA_TEXAS_MEAL_TICKET_PRICE,
  SIX_FLAGS_FULL_TICKET_PRICE,
  SIX_FLAGS_MEAL_TICKET_PRICE,
} from '@/consts';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTicketPrice = (park: string): number | undefined => {
  switch (park) {
    case 'Fiesta Texas':
      return FIESTA_TEXAS_FULL_TICKET_PRICE;
    case 'Six Flags Over Texas':
      return SIX_FLAGS_FULL_TICKET_PRICE;
    case 'Carowinds':
      return CAROWINDS_FULL_TICKET_PRICE;
  }
};

export const getMealTicketPrice = (park: string) => {
  switch (park) {
    case 'Fiesta Texas':
      return FIESTA_TEXAS_MEAL_TICKET_PRICE;
    case 'Six Flags Over Texas':
      return SIX_FLAGS_MEAL_TICKET_PRICE;
    case 'Carowinds':
      return CAROWINDS_MEAL_TICKET_PRICE;
  }
};
