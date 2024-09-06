import { useState } from 'react';

export default function ContractPreview({formSubmission, handleFormSubmit, getCarMMY}){
    const [buttonText, setButtonText] = useState("Generate NFT");

    function handleButton(formSubmission) {
        setButtonText("Minting NFT, please wait..")
        handleFormSubmit(formSubmission);
    }

    return(
        <div className="contract-container">
            <h2>Your Rental Agreement 🖊️</h2>
            <div className="contract-details">
                <p>Your DIMO Address: {formSubmission.address}</p>
                <p>Your Car: {getCarMMY(formSubmission.selectedCar.metadata)}</p>
                <p>Rental Start Date: {formSubmission.startDate}</p>
                <p>Rental End Date: {formSubmission.endDate}</p>
                <p>Renters Name: {formSubmission.driverName}</p>
                <p>Drivers 0x Address: {formSubmission.driverAddress}</p>
                <button onClick={() => handleButton(formSubmission)}>{buttonText}</button>
            </div>
        </div>
    )
}