require('dotenv').config({ path: '../.env' });
const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const app = express();
const port = 4000;
const LOCALHOST = process.env.LOCALHOST;

// allow access to React app domain

app.use(
    cors({
      origin: LOCALHOST,
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