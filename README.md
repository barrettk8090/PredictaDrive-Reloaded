# PredictaDrive 

## Developer Setup Instructions 
In order to properly run and test PredictaDrive, you'll need to get both the server and frontend running:

1. Clone this repository onto your local machine and open in your code editor of choice.
2. Open a terminal and `cd` into `/server`.
3. Run `npm install` and then `npm start`. This should start the server on `localhost:4000`. You can test that it's working by navigating to [this test address](http://localhost:4000/nft/0x48f6EdC54Ae0706b5e6cFC33C342B49bf2dDb939). 
4. In a new terminal window, ensure that you're in the root directory, and add in your `.env` as discussed.
5. While you're still in the root directory, run `npm install` and `npm run dev`. This will startup the frontend. You can test that it's working by navigating to: http://localhost:5173/

## Current Testing Flow – Last Updated: 08.25.24

1. On the frontend, verify that the Connect Wallet button opens the Wallet Connect flow.
2. Try connecting your wallet via the address that is associated with your DIMO account.
3. Ensure that the page updates with NFT details about your vehicle including Token IDs, Metadata, Owner Of, Token Address, and Token URI.

Not yet working:
* Disconnecting your wallet does not yet auto clear the pace
* Date dropdowns aren't yet excluding past dates
* etc, etc, etc