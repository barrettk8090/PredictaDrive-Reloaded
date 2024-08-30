import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useWalletInfo } from '@web3modal/wagmi/react'
import Header from './Header';
import RentalForm from './RentalForm';
import ConnectButton from './ConnectButton';
import createNFTMetadata from "../utils/nftMeta"
import { mintNFT } from '../utils/nftMinter';
import nftTestImg from "../../public/nftTestImg.gif"

export default function Home(){
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({ address });
    const { walletInfo } = useWalletInfo();  
    const [nftData, setNftData] = useState(null);
    const [mintingStatus, setMintingStatus] = useState(null);

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

    // Handle Rental Form Submission 
    // TODO: Include logic for generating and minting NFT
    const handleFormSubmit = async (formData) => {
        const metadata = createNFTMetadata(formData);
        setNftData(metadata);
        setMintingStatus("Preparing metadata..");
        console.log("NFT Metadata created:", nftData);
        metadata.image = nftTestImg
        setMintingStatus("Minting NFT...");
        const result = await mintNFT(metadata);
        if (result.success) {
            setMintingStatus("NFT minted successfully!");
            console.log("New NFT Details: ", result);
        } else {
            setMintingStatus("Failed to mint NFT");
            console.error("Mint error: ", result.error);
        }
        
    }


    return(
        <div>
            <Header/>
            {!isConnected? (
                <div className="disconnected-hero">
                    <h1>Lets Get Connected</h1>
                    <p>In order to begin, please connect your wallet that's linked to your DIMO account. </p>
                    <ConnectButton/>
                </div>
            ) : 
            <div className="connected-main">
                {/* <NFTJSON address={address}/> */}
                <RentalForm address={address} handleFormSubmit={handleFormSubmit}/>
                <ConnectButton/>
            </div>
            }
        </div>
    )
}