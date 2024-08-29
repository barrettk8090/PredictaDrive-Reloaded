import { ethers } from 'ethers';

const NFT_ABI = [
    "function mintNFT(string memory tokenURI) public returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)"
  ];

//   NEED TO TEST - This is on Sepolia
const NFT_CONTRACT_ADDRESS = "0xAc755578ed07193544E046037A1CA5Ff9098dCCc";

export async function mintNFT(metadata) {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);

        // FIX THIS
        const tokenURI = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;

        try {
            const transaction = await contract.mintNFT(tokenURI);
            const tx = await transaction.wait();
            const event = tx.events[0];
            const value = event.args[2];
            const tokenId = value.toNumber();

            return {
                success: true,
                tokenId: tokenId,
                transactionHash: tx.transactionHash
            };
        } catch (error) {
            console.error("Error with minting NFT: ", error);
            return {
                success: false,
                error: error.message
            };
        }
    } else {
    console.log("Missing metamask or some other error.");
    }
}