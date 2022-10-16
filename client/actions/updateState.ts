import { Keypair, PublicKey, Connection } from '@solana/web3.js'

import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';

import BN from "bn.js";
import { Solkitties } from "../../target/types/solkitties";
import { findGlobalAccount, PROGRAM_ID } from '../utils';


export const updateState = async (
    program: Program<Solkitties>,
    authority: Keypair,
    ticket_price: BN | null,
    total_tickets: BN | null,
    end_date: BN | null,
) => {
    const globalState = findGlobalAccount();

    try {
        const tx = await program.methods.updateState(
            ticket_price,
            total_tickets,
            end_date
        )
            .accounts({
                authority: authority.publicKey,
                globalState,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([authority])
            .rpc();
        console.log(tx);
    }
    catch (ex) {
        console.log(ex);
    }
}