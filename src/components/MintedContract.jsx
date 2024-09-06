import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

const NFT_ABI = [
  "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

const NFT_CONTRACT_ADDRESS = "0xAc755578ed07193544E046037A1CA5Ff9098dCCc";

export default function NFTDetails() {
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tokenId } = useParams();

  useEffect(() => {
    const fetchNFTData = async () => {
      if (typeof window.ethereum === 'undefined') {
        setError("Ethereum provider not detected");
        setLoading(false);
        return;
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);

        const tokenURI = await contract.tokenURI(tokenId);
        
        if (tokenURI.startsWith('data:application/json;base64,')) {
          const base64Data = tokenURI.split(',')[1];
          const jsonString = atob(base64Data);
          const parsedData = JSON.parse(jsonString);
          setNftData(parsedData);
        } else {
          const response = await fetch(tokenURI);
          const data = await response.json();
          setNftData(data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching NFT data:", err);
        setError("Failed to fetch NFT data");
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [tokenId]);

  if (loading) return <div>Loading NFT details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nftData) return <div>No NFT data found</div>;

  return (
    <div className="nft-details">
      <h2>{nftData.name}</h2>
      <img src={nftData.image} alt={nftData.name} className="nft-image" />
      <p>{nftData.description}</p>
      <h3>Attributes:</h3>
      <ul>
        {nftData.attributes.map((attr, index) => (
          <li key={index}>
            <strong>{attr.trait_type}:</strong> {attr.value}
          </li>
        ))}
      </ul>
      <p>
        <strong>Contract Address:</strong>{' '}
        <a
          href={`https://sepolia.etherscan.io/address/${NFT_CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {NFT_CONTRACT_ADDRESS}
        </a>
      </p>
      <p>
        <strong>Token ID:</strong> {tokenId}
      </p>
    </div>
  );
}