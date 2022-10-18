import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const SOLKITTIES_PROGRAM_ID = new PublicKey("C7KGdk3H9yTvZF7TDPeJJwvNo5jMSie4onZ3XLzToTVc");

export const SOLKITTIES_PREFIX = 'solkitties';

export const SALE_PREFIX = 'sale';

export interface GlobalState {
    authority: PublicKey;
    ticketPrice: BN;
    totalTickets: BN;
    endDate: BN;
    soldTickets: BN;
}

export interface SaleState {
    authority: PublicKey;
    tickets: BN;
}