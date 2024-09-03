import { ethers } from 'ethers';

const NFT_ABI = [
    "function mintNFT(string memory tokenURI) public returns (uint256)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)"
  ];

//   NEED TO TEST - This is on Sepolia
const NFT_CONTRACT_ADDRESS = "0xAc755578ed07193544E046037A1CA5Ff9098dCCc";

export async function mintNFT(metadata) {
    if (typeof window.ethereum === 'undefined') {
        console.log("Not detecting eth/metamask");
        return { success: false, error: "Eth/Metamask not found"};
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
        const receipt = await transaction.wait();
        const event = receipt.events.find(event => event.event === 'Transfer');
        const tokenId = event.args.tokenId.toNumber();

        console.log("NFT minted successfully: ", {
            tokenId: tokenId,
            transactionHash: receipt.transactionHash,
            tokenURI: tokenURI
        });

        return {
            success: true,
            tokenId: tokenId,
            transactionHash: receipt.transactionHash,
            tokenURI: tokenURI
        };
    } catch (error){
        console.error("Error minting the NFT:", error);
        return {
            success: false,
            error: error
        };
    }
}