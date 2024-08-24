

// const express = require("express");
// const cors = require("cors");

// const { EvmChain } = require("@moralisweb3/common-evm-utils");

// const app = express();
// const port = 4000;

// // allow access to React app domain
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// );

// const MORALIS_API_KEY = process.env.MORALIS_API_KEY
// const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

// app.get("/balances", async (req, res) => {
//   try {
//     // Promise.all() for receiving data async from two endpoints
//     const [nativeBalance, tokenBalances] = await Promise.all([
//       Moralis.EvmApi.balance.getNativeBalance({
//         chain: EvmChain.ETHEREUM,
//         address,
//       }),
//       Moralis.EvmApi.token.getWalletTokenBalances({
//         chain: EvmChain.ETHEREUM,
//         address,
//       }),
//     ]);
//     res.status(200).json({
//       // formatting the output
//       address,
//       nativeBalance: nativeBalance.result.balance.ether,
//       tokenBalances: tokenBalances.result.map((token) => token.display()),
//     });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500);
//     res.json({ error: error.message });
//   }
// });

// async function getDemoData() {
//   const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
//     address,
//     chain,
//   });
//   const native = nativeBalance.result.balance.ether;

//   const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
//     address,
//     chain,
//   });
//   const tokens = tokenBalances.result.map((token) => token.display());

//   // Get the nfts
//   const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
//     address,
//     chain,
//     limit: 10,
//   });

//   // Format the output to return name, amount and metadata
//   const nfts = nftsBalances.result.map((nft) => ({
//     name: nft.result.name,
//     amount: nft.result.amount,
//     metadata: nft.result.metadata,
//   }));

//   // Add nfts to the output
//   return { native, tokens, nfts };
// }

// app.get("/demo", async (req, res) => {
//     try {
//       // Get and return the crypto data
//       const data = await getDemoData();
//       res.status(200);
//       res.json(data);
//     } catch (error) {
//       // Handle errors
//       console.error(error);
//       res.status(500);
//       res.json({ error: error.message });
//     }
//   });


require('dotenv').config({ path: '../.env' });
const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const app = express();
const port = 4000;

// allow access to React app domain
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
  
  const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
  
  // New endpoint to get NFT contract details
  app.get("/nft/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const chain = "0x89"; // Polygon chain
  
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain,
        format: "decimal",
        mediaItems: false,
        address
      });
  
      res.json(response.raw);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching NFT data" });
    }
  });
  
  const startServer = async () => {
    await Moralis.start({
      apiKey: MORALIS_API_KEY,
    });
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
  
  startServer();