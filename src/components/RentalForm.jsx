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

    // Setup date and enforce future-only dates in the form below
    const now = new Date();

    const formatDate = (date) => {
        return date.toISOString().slice(0, 16);
    };

    const minDate = formatDate(now);

    return(
        <div>
            <h2 className="rental-header">Enter Your Car Information</h2>
            <p className="rental-header">Below, choose the DIMO vehicle that will be rented, along with the aniticpated start and end dates for the trip. You'll enter driver details next.</p>
            <div id="rental-form-container">
                <div className="nft-img-container">
                    {nftImage && <img className="nft-img" src={nftImage}/>}
                </div>
                <form className="rental-form">
                    <label>Choose Your Car</label>
                    <select>
                        {singleNFTCarMMY}
                    </select>
                    <br/>
                    <label>When Does the Trip Start?</label>
                    <input 
                    type="datetime-local"
                    min={minDate}
                    />
                    <br/>
                    <label>When Does the Trip End?</label>
                    <input 
                    type="datetime-local"
                    min={minDate}
                    />
                    <button>Next</button>
                </form>
            </div>
        </div>
    )
}