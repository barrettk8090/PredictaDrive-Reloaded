export default function DriverDetails(){

    // const handleDriverData = (e) => {
    //     e.PreventDefault();
    //     formSubmission["driverName"]: driverName,
    //     formSubmission["driverAddress"]: driverAddress
    // }

    return(
        <>
        <div>
            <h2>Driver Information</h2>
            <p>Please enter the details for the driver of your vehicle</p>
        </div>
        <div>
            {/* <div className="nft-img-container">
                {nftImage && <img className="nft-img" src={nftImage}/>}
            </div> */}
            <form className="rental-form">
                <label>Drivers Name</label>
                <input>
                </input>
                <label>Drivers 0x Address</label>
                <input>
                </input>
                <button>Generate Rental Contract</button>
            </form>
        </div>
        </>
    )
}