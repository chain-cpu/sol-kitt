import * as anchor from '@project-serum/anchor';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { PublicKey, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';

export const PREFIX = 'solkitties';
export const SALE = 'sale';

export const PROGRAM_ID = new PublicKey("C7KGdk3H9yTvZF7TDPeJJwvNo5jMSie4onZ3XLzToTVc");

export const sleep = async (seconds) => {
  await new Promise(f => setTimeout(f, 1000 * seconds));
}

export function getKeypairFromString(str): Keypair {
  return Keypair.fromSecretKey(bs58.decode(str));
}

export async function safeAirdrop(connection: anchor.web3.Connection, key: anchor.web3.PublicKey, amount: number) {

  while (await connection.getBalance(key) < amount * LAMPORTS_PER_SOL) {
    try {
      await connection.confirmTransaction(
        await connection.requestAirdrop(key, LAMPORTS_PER_SOL),
        "confirmed"
      );
    } catch { }
  };
}

export const findGlobalAccount = (): PublicKey => {
  let [pubkey, bump] = findProgramAddressSync(
    [Buffer.from(PREFIX)],
    PROGRAM_ID,
  );

  return pubkey;
}
export const findSaleAccount = (
  authority: PublicKey
): PublicKey => {
  let [pubkey, bump] = findProgramAddressSync(
    [Buffer.from(PREFIX), authority.toBuffer(), Buffer.from(SALE)],
    PROGRAM_ID,
  );

  return pubkey;
}