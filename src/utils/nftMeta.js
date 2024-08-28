
export default function createNFTMetadata(formData){
    // address = users address, driversAddress = renters address
    const { address, selectedCar, startDate, endDate, driverAddress} = formData;


    return {
        name: "PredictaDrive Insurance",
        description: `Rental agreement for ${getCarMMY(selectedCar.metadata)}`,
        // TODO: Generate an image 
        image: "TBD – FIGURE OUT HOW WE'RE DOING IMAGES",
        attributes: [
            { trait_type: "Owner Address", value: address },
            { trait_type: "Vehicle Name", value: getCarMMY(selectedCar.metadata) },
            { trait_type: "Start Date", value: startDate },
            { trait_type: "End Date", value: endDate },
            { trait_type: "Drivers Address", value: driverAddress },
            { trait_type: "Vehicle Token ID", value: selectedCar.token_id }
        ]
    };
}

function getCarMMY(metadata) {
    try {
        const parsedMetadata = JSON.parse(metadata);
        return parsedMetadata.attributes.map(detail => detail.value).join(' ');
    } catch (error) {
        console.error("Error parsing metadata:", error);
        return "Unknown Vehicle";
    }
}