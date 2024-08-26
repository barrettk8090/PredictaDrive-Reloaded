import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useWalletInfo } from '@web3modal/wagmi/react'
import Header from './Header';
import RentalForm from './RentalForm';
import NFTJSON from './NFTJSON';

export default function Home(){
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({ address });
    const { walletInfo } = useWalletInfo();  

    useEffect(() => {
        if(isConnected) {
            const walletDetails = {
                connectStatus: "connected",
                address: address,
                balance: balance,
                walletInfoName: walletInfo.name,
                walletInfoIcon: walletInfo.icon
            }
        }
    }, [isConnected, address, balance])


    return(
        <div>
            <Header/>
            {!isConnected? (
                <div>
                    <h2>Get Connected</h2>
                    <p>In order to begin, please connect your wallet that's linked to your DIMO account. </p>
                </div>
            ) : 
            <div>
                {/* <NFTJSON address={address}/> */}
                <RentalForm address={ address }/>
            </div>
            }
        </div>
    )
}