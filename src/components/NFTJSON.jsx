import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NFTJSON(){
    const [nftJson, setNftJson] = useState({});

    useEffect(() => {
        // TODO: Replace address with real address 
        axios(`http://localhost:4000/nft/0x48f6EdC54Ae0706b5e6cFC33C342B49bf2dDb939`)
        .then(({ data }) => {
            setNftJson(data);
        })
    })

    console.log(nftJson)

    // const dimoNFT = nftJson.map(dimojson)

    return(
        <>
        </>
    )
}