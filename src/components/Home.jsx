import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useSwitchChain } from 'wagmi';
import { useWalletInfo } from '@web3modal/wagmi/react'
import { useNavigate } from 'react-router';
import RentalForm from './RentalForm';
import ConnectButton from './ConnectButton';
import createNFTMetadata from "../utils/nftMeta"
import { mintNFT } from '../utils/nftMinter';
import homeImg from "../assets/homeImg.jpg";

export default function Home(){
    const { address, isConnected, chain } = useAccount();
    const { data: balance } = useBalance({ address });
    const { walletInfo } = useWalletInfo(); 
    const { switchChain } = useSwitchChain(); 
    const [nftData, setNftData] = useState(null);
    const [mintingStatus, setMintingStatus] = useState(null);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    // Handle Rental Form Submission & Mint NFT
    const handleFormSubmit = async (data) => {
        setFormData(data);
        setMintingStatus("Initiating switch to Sepolia");

        try {
            // Sepolia ChainID = 11155111
            if (chain.id !== 11155111) {
                await switchChain(11155111);
            }
            await generateNFT(data);
        } catch (error) {
            console.error("Error during network switch or NFT generation:", error);
            setMintingStatus("Error: " + error.message);
        }
    }

    const generateNFT = async (data) => {
        const metadata = createNFTMetadata(data);
        setNftData(metadata);
        setMintingStatus("Preparing metadata..");
        setMintingStatus("Minting NFT...");
        try {
            const result = await mintNFT(metadata);
            if (result.success) {
                setMintingStatus("NFT minted successfully!");
                navigate(`/minted-contract/${result.tokenId}`);
            } else {
                setMintingStatus("Failed to mint NFT: " + result.error);
                console.error("Mint error: ", result.error);
            }
        } catch (error) {
            console.error("Error in mintNFT:", error);
            setMintingStatus("Error minting NFT: " + error.message);
        }
    }

    return(
        <div>
            {!isConnected? (
                <div className="disconnected-hero">
                    <h1>Rental Car Insurance for PredictaDrive Hosts</h1>
                    <img className="home-hero" src={homeImg}/>
                    <div className="how-it-works">
                        <h2>How It Works</h2>
                        <ul>
                            <li><span className="nums">1.</span> Connect Your DIMO Wallet.</li>
                            <li><span className="nums">2.</span> Pick a host car, and set rental trip dates.</li>
                            <li><span className="nums">3.</span> Provide information about the driver of your vehicle.</li>
                            <li><span className="nums">4.</span> Generate an NFT the can be used betting markets, like Augur.</li>
                        </ul>
                    </div>
                    <div className="get-connected">
                        <p>In order to begin, please connect your wallet that's linked to your DIMO account. </p>
                        <ConnectButton/>
                    </div>
                </div>
            ) : 
            <div className="connected-main">
                <RentalForm address={address} handleFormSubmit={handleFormSubmit}/>
                <ConnectButton/>
            </div>
            }
        </div>
    )
}