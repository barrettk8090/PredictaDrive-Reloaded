import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import DriverDetails from "./DriverDetails"

export default function RentalForm({ address, handleFormSubmit }){
    const [nftJson, setNftJson] = useState([]);
    const [nftImage, setNftImage] = useState("");
    const [selectedCar, setSelectedCar] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [formSubmission, setFormSubmission] = useState("")
    // 🔽 TODO: Replace with real address from Bobs Component
    // const [driverAddress, setDriverAddress] = useState("");
    
    const navigate = useNavigate;

    // Retrieve a users NFTs based on their connected wallet address
    useEffect(() => {
        if (address) {
            axios(`http://localhost:4000/nft/${address}`)
            .then(({ data }) => {
                const dimoVehicles = data.result.filter(nft => nft.name === "DIMO Vehicle ID");
                setNftJson(dimoVehicles);
                if (dimoVehicles.length > 0) {
                    updateNftImage(dimoVehicles[0].token_id);
                }
        })};
    }, [address]);

    // Update the NFT based on a selected car in the dropdown form
    const updateNftImage = (tokenId) => {
        setNftImage(`https://devices-api.dimo.zone/v1/vehicle/${tokenId}/image`);
    }
    
    // Parse the metadata in the NFT to get the Make, Model, and Year of the users vehicles
    const getCarMMY = (metadata) => {
        try {
            const parsedMetadata = JSON.parse(metadata);
            return parsedMetadata.attributes.map(detail => detail.value).join(' ');
        } catch (error) {
            console.error("Error parsing metadata:", error);
            return null;
          }
    }

    const handleCarChange = (e) => {
        const index = parseInt(e.target.value);
        setSelectedCar(index);
        updateNftImage(nftJson[index].token_id);
    }

    // Setup date and enforce future-only dates in the form below
    // TODO: Format the end date so that it cannot be before the start date, and any other restrictions we want to add.
    const now = new Date();
    const formatDate = (date) => {
        return date.toISOString().slice(0, 16);
    };
    const minDate = formatDate(now);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            address: address,
            selectedCar: nftJson[selectedCar],
            startDate,
            endDate,
        };
        // console.log(formSubmission)
        setFormSubmission(data)
        // TODO: useNavigate here to go to next "page"
        // handleFormSubmit(formSubmission);
    }

    return(
        <div>
            <h2 className="rental-header">Enter Your Car Information</h2>
            <p className="rental-header">Below, choose the DIMO vehicle that will be rented, along with the aniticpated start and end dates for the trip. You'll enter driver details next.</p>
            <div id="rental-form-container">
                <div className="nft-img-container">
                    {nftImage && <img className="nft-img" src={nftImage}/>}
                </div>
                <form className="rental-form" onSubmit={handleSubmit}>
                    <label>Choose Your Car</label>
                    <select onChange={handleCarChange} value={selectedCar}>
                    {nftJson.map((car, index) => (
                        <option key={car.token_id} value={index}>
                            {getCarMMY(car.metadata)}
                        </option>
                    ))}
                    </select>
                    <br/>
                    <label>When Does the Trip Start?</label>
                    <input 
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={minDate}
                        required
                    />
                    <br/>
                    <label>When Does the Trip End?</label>
                    <input 
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={minDate}
                        required
                    />
                    <button type="submit">Next</button>
                </form>
            </div>
            {formSubmission &&
                <DriverDetails formSubmission={formSubmission} handleFormSubmit={handleFormSubmit} getCarMMY={getCarMMY}/>
            }
        </div>
    )
}