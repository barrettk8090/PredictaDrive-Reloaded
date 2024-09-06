import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

const NFT_ABI = [
  "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

const NFT_CONTRACT_ADDRESS = "0xc1305b50cD2d52EB1d8d6D089aF0957E843F4884";

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
    <div className="final-contract-container">
      <h2>Your Insurance Contract:</h2>
      <p>You've successfully generated an insurance contract! </p>
      <p>See below for the contract details, along with next steps on how to use your insurance.</p>
      <img src={nftData.image} alt={nftData.name} className="nft-image" />
      <p>Your {nftData.description}</p>
      <h3>Contract Details:</h3>
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
      <div className="whats-next">
        <h2>What's Next?</h2>
            <ul>
                <li><span className="nums">1.</span> Launch your preferred prediction network.</li>
                <li><span className="nums">2.</span> Connect to the network and list your NFT.</li>
                <li><span className="nums">3.</span> Post your bait.</li>
                <li><span className="nums">4.</span> Allow others to bet against you.</li>
            </ul>
      </div>
      <a href="https://www.alchemy.com/best/web3-prediction-markets" target="_blank">
        <button>Check Out Networks →</button>
      </a>
    </div>
  );
}