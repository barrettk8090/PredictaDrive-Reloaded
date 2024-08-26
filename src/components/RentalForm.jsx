import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RentalForm({ address }){
    const [nftJson, setNftJson] = useState([]);
    const [nftImage, setNftImage] = useState("");

    // Retrieve a users NFTs based on their connected wallet address
    useEffect(() => {
        if (address){
            axios(`http://localhost:4000/nft/${address}`)
            .then(({ data }) => {
                setNftJson(data.result);
        })}
    }, [address])

    // Retrieve the NFT image based on tokenID
    // TODO: RN, only works for 1 Nft, need to make dynamic based on the car selected in the dropdown
    useEffect(() => {
        const dimoVehicle = nftJson.find(singleCar => singleCar.name === "DIMO Vehicle ID");
        if (dimoVehicle) {
            const tokenId = dimoVehicle.token_id;
            setNftImage(`https://devices-api.dimo.zone/v1/vehicle/${tokenId}/image`);
        }
    }, [nftJson]);
    

    // Parse the metadata in the NFT to get the Make, Model, and Year of the users vehicles
    const getCarMMY = (metadata) => {
        try {
            const parsedMetadata = JSON.parse(metadata);
            let MMY = ""
            for (let details of parsedMetadata.attributes){
                MMY += (details.value + " ")
            }
            return MMY
        } catch (error) {
            console.error("Error parsing metadata:", error);
            return null;
          }
    }

    const singleNFTCarMMY = nftJson.map(singleCar => {
        if (singleCar.name === "DIMO Vehicle ID"){
            const carMMY = getCarMMY(singleCar.metadata)
            return (
                <option value={carMMY}>{carMMY}</option>
            )
        }
    })

    return(
        <>
            <div id="rental-form">
                <h2>Enter Your Car Information</h2>
                <form>
                    <label>Select A DIMO Vehicle</label>
                    <select>
                        {singleNFTCarMMY}
                    </select>
                    <br/>
                    <label>Select A Trip Start Date</label>
                    <input type="datetime-local"></input>
                    <br/>
                    <label>Select A Trip End Date</label>
                    <input type="datetime-local"></input>
                </form>
                <div className="nft-img-container">
                    {nftImage && <img src={nftImage}/>}
                </div>
            </div>
        </>
    )
}