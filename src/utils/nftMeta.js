
export default function createNFTMetadata(formData){
    // address = users address, driversAddress = renters address
    // const { selectedCar, driverAddress} = formData;
    console.log("Form Data as its passed into CreateNFTMeta: ",formData)
    
    function getCarMMY(metadata) {
        try {
            const parsedMetadata = JSON.parse(metadata);
            return parsedMetadata.attributes.map(detail => detail.value).join(' ');
        } catch (error) {
            console.error("Error parsing metadata:", error);
            return "Unknown Vehicle";
        }
    }

    return {
        name: "PredictaDrive Insurance",
        description: `Rental agreement for ${getCarMMY(formData.selectedCar.metadata)}`,
        // TODO: Generate an image 
        image: "TBD – FIGURE OUT HOW WE'RE DOING IMAGES",
        attributes: [
            { trait_type: "Owner Address", value: formData.address },
            { trait_type: "Vehicle Name", value: getCarMMY(formData.selectedCar.metadata) },
            { trait_type: "Start Date", value: formData.startDate },
            { trait_type: "End Date", value: formData.endDate },
            { trait_type: "Drivers Address", value: formData.driverAddress },
            { trait_type: "Vehicle Token ID", value: formData.selectedCar.token_id }
        ]
    };
}