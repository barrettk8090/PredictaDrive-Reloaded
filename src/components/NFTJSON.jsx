import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NFTJSON({ address }){
    const [nftJson, setNftJson] = useState([]);

    console.log(address)

    useEffect(() => {
        // TODO: Replace address with real address 
        if (address){
            axios(`http://localhost:4000/nft/${address}`)
            .then(({ data }) => {
                setNftJson(data.result);
        })}
    }, [address])

    console.log(nftJson)

    const getImageUrl = (metadata) => {
        try {
          const parsedMetadata = JSON.parse(metadata);
          return parsedMetadata.image;
        } catch (error) {
          console.error("Error parsing metadata:", error);
          return null;
        }
      };

    const singleNFT = nftJson.map(item => {
        if (item.name === "DIMO Vehicle ID"){
            const imageUrl = getImageUrl(item.metadata);
            return(
                <div>
                    <h3>Vehicle Info: </h3>
                    <div>
                        <p>Token ID: {item.token_id}</p>
                        <p>Metadata: {item.metadata}</p>
                        <p>Owner of: {item.owner_of}</p>
                        <p>Token Address: {item.token_address}</p>
                        <p>Token URI: {item.token_uri}</p>
                        <p>Associated NFT Image:</p>
                        <img className="nft-image" src={imageUrl}></img>
                    </div>
                </div>
            )
        }
    })

    return(
        <>
            {nftJson ? singleNFT : <></>}
        </>
    )
}