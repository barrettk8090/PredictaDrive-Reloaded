import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NFTJSON({ address }){
    const [nftJson, setNftJson] = useState([]);

    console.log(address)

    useEffect(() => {
        // TODO: Replace address with real address 
        axios(`http://localhost:4000/nft/${address}`)
        .then(({ data }) => {
            setNftJson(data.result);
        })
    })

    console.log(nftJson)

    const singleNFT = nftJson.map(item => {
        if (item.name === "DIMO Vehicle ID"){
            return(
                <div>
                    <p>Token ID: {item.token_id}</p>
                    <p>Metadata: {item.metadata}</p>
                    <p>Owner of: {item.owner_of}</p>
                    <p>Token Address: {item.token_address}</p>
                    <p>Token URI: {item.token_uri}</p>
                </div>
            )
        }
    })

    return(
        <>
            {singleNFT}
        </>
    )
}