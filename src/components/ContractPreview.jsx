export default function ContractPreview({formSubmission, handleFormSubmit, getCarMMY}){

    return(
        <>
            <h2>Here's a preview of your agreement. Do you want to publish?</h2>
            <p>Your DIMO Address: {formSubmission.address}</p>
            <p>Your Car: {getCarMMY(formSubmission.selectedCar.metadata)}</p>
            <p>Begins on: {formSubmission.startDate}</p>
            <p>Ends on: {formSubmission.endDate}</p>
            <p>Your cars driver: {formSubmission.driverName}</p>
            <p>Drivers Address: {formSubmission.driverAddress}</p>
            <button onClick={() => handleFormSubmit(formSubmission)}>Generate NFT</button>
        </>
    )
}