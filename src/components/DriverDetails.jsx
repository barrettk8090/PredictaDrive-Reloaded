import { useState } from 'react';
import { useNavigate } from 'react-router';
import ContractPreview from './ContractPreview';

export default function DriverDetails({formSubmission, handleFormSubmit, getCarMMY, nftImage}){
    const [driverAddress, setDriverAddress] = useState("");
    const [driverName, setDriverName] = useState("");
    const [previewContract, setPreviewContract] = useState(false);
    const navigate = useNavigate();


    const handleDriverData = (e) => {
        e.preventDefault();
        formSubmission.driverName = driverName
        formSubmission.driverAddress = driverAddress
        setPreviewContract(true);
        console.log("Updated Form Submission:", formSubmission)
        navigate("/contract-preview");
    }

    return(
        <div className="driver-container">
            <div className="rental-header">
                <h2>Driver Information</h2>
                <p>Please enter the details for the driver of your vehicle</p>
            </div>
            <div>
                {/* <div className="nft-img-container">
                    {nftImage && <img className="nft-image" src={nftImage}/>}
                </div> */}
                <form className="driver-form" onSubmit={handleDriverData}>
                    <label>Drivers Name</label>
                    <input
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        required/>
                        
                    <label>Drivers 0x Address</label>
                    <input
                        value={driverAddress}
                        onChange={(e)=> setDriverAddress(e.target.value)}
                        required />
                    <button type="submit">Preview Contract</button>
                </form>
                {previewContract &&
                    <ContractPreview formSubmission={formSubmission} handleFormSubmit={handleFormSubmit} getCarMMY={getCarMMY}/>}
            </div>
        </div>
    )
}