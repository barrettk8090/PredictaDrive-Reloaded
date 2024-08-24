import React, { useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useWalletInfo } from '@web3modal/wagmi/react'
import ConnectButton from "../ConnectButton"
import RentalForm from './RentalForm';

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
            console.log(walletDetails);
        }
    }, [isConnected, address, balance])

    return(
        <>
            <div>
                <h1>PredictaDrive</h1>
                <h2>Using DIMO</h2>
                <ConnectButton/>
                <RentalForm/>
            </div>
        </>
    )
}