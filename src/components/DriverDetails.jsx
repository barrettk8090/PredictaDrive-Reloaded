import { useState } from 'react';
import ContractPreview from './ContractPreview';
import { ethers } from 'ethers';

export default function DriverDetails({formSubmission, handleFormSubmit, getCarMMY}){
    const [driverAddress, setDriverAddress] = useState("");
    const [driverName, setDriverName] = useState("");
    const [isResolvingENS, setIsResolvingENS] = useState(false);
    const [previewContract, setPreviewContract] = useState(false);


    const handleDriverData = (e) => {
        e.preventDefault();
        formSubmission.driverName = driverName
        formSubmission.driverAddress = driverAddress
        setPreviewContract(true);
        console.log("Updated Form Submission:", formSubmission)
    }

    const resolveENS = async (ensName) => {
        setIsResolvingENS(true);
        try {
            const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/c0ad4e8eee944d69a642a63187947e8d');
            const address = await provider.resolveName(ensName);
            if (address) {
                setDriverAddress(address);
            } else {
                setDriverAddress(name);
            }
        } catch (error) {
            console.error('Error resolving ENS name:', error);
            setDriverAddress(ensName);
        }
        setIsResolvingENS(false);
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setDriverAddress(value);
    
        if (value.endsWith('.eth')) {
            resolveENS(value);
        }
    }

    return(
        <>
        <div className="driver-container">
            <div className="rental-header">
                <h2>Driver Information</h2>
                <p>Please enter the details for the driver of your vehicle</p>
            </div>
            <div>
                <form className="driver-form" onSubmit={handleDriverData}>
                    <label>Drivers Name</label>
                    <input
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        required/>
                        
                    <label>Driver's Address (0x or ENS)</label>
                    <input
                        value={driverAddress}
                        onChange={handleAddressChange}
                        onBlur={() => {
                            if (driverAddress.endsWith('.eth')) {
                                resolveENS(driverAddress);
                            }
                        }}
                        disabled={isResolvingENS}
                        required />
                    {isResolvingENS && <p>Resolving ENS name...</p>}
                    <button type="submit">Preview Contract</button>
                </form>
            </div>
        </div>
            {previewContract &&
                <ContractPreview formSubmission={formSubmission} handleFormSubmit={handleFormSubmit} getCarMMY={getCarMMY}/>}
    </>
    )
}