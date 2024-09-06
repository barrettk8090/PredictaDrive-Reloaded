import { ethers } from 'ethers';

const NFT_ABI = [
    "function mintNFT(string memory tokenURI) public returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function totalSupply() public view returns (uint256)"
];

// Sepolia contract for testing 
const NFT_CONTRACT_ADDRESS = "0xc1305b50cD2d52EB1d8d6D089aF0957E843F4884";

export async function mintNFT(metadata) {
    if (typeof window.ethereum === 'undefined') {
        console.log("Not detecting eth/metamask");
        return { success: false, error: "Eth/Metamask not found" };
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);

        const metadataString = JSON.stringify(metadata);
        const encodedMetadata = Buffer.from(metadataString).toString('base64');
        const tokenURI = `data:application/json;base64,${encodedMetadata}`;

        const transaction = await contract.mintNFT(tokenURI);
        console.log("Transaction sent:", transaction.hash);
        const receipt = await transaction.wait();
        console.log("Transaction confirmed:", receipt);

        // Get the total supply after minting
        const totalSupply = await contract.totalSupply();
        const tokenId = totalSupply.toString();

        console.log("NFT minted successfully with tokenId:", tokenId);

        return {
            success: true,
            tokenId: tokenId,
            transactionHash: receipt.transactionHash,
            tokenURI: tokenURI
        };
    } catch (error) {
        console.error("Error minting the NFT:", error);
        return {
            success: false,
            error: error.message
        };
    }
}