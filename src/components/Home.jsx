import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useSwitchChain } from 'wagmi';
import { useWalletInfo } from '@web3modal/wagmi/react'
import Header from './Header';
import RentalForm from './RentalForm';
import ConnectButton from './ConnectButton';
import createNFTMetadata from "../utils/nftMeta"
import { mintNFT } from '../utils/nftMinter';
import nftTestImg from "../../public/nftTestImg.gif"

export default function Home(){
    const { address, isConnected, chain } = useAccount();
    const { data: balance } = useBalance({ address });
    const { walletInfo } = useWalletInfo(); 
    const { switchChain } = useSwitchChain(); 
    const [nftData, setNftData] = useState(null);
    const [mintingStatus, setMintingStatus] = useState(null);
    const [formData, setFormData] = useState(null);

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

    // Handle Rental Form Submission & Mint NFT
    const handleFormSubmit = async (formSubmission) => {
        console.log("Form submission data after submit: ", formSubmission)
        setFormData(formSubmission);
        console.log(formData)
        setMintingStatus("Initiating switch to Sepolia");
        console.log(mintingStatus);

        // Sepolia ChainID = 11155111
        if (chain.id !== 11155111) {
            await switchChain(11155111);
        }

        await generateNFT(formData);
    }

    const generateNFT = async (formData) => {
        console.log("THIS IS THE FORMDATA:", formData)
        const metadata = createNFTMetadata(formData);
        setNftData(metadata);
        setMintingStatus("Preparing metadata..");
        console.log("NFT Metadata created:", nftData);
        console.log(mintingStatus)
        metadata.image = nftTestImg
        setMintingStatus("Minting NFT...");
        console.log(mintingStatus)
        const result = await mintNFT(metadata);
        if (result.success) {
            setMintingStatus("NFT minted successfully!");
            console.log(mintingStatus)
            console.log("New NFT Details: ", result);
        } else {
            setMintingStatus("Failed to mint NFT");
            console.log(mintingStatus)
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