
export default function createNFTMetadata(formData){
    
    function getCarMMY(metadata) {
        try {
            const parsedMetadata = JSON.parse(metadata);
            return parsedMetadata.attributes.map(detail => detail.value).join(' ');
        } catch (error) {
            console.error("Error parsing metadata:", error);
            return "Unknown Vehicle";
        }
    }

    const imageUrl = "https://i.imgur.com/Nkuu1f2.gif"

    return {
        name: "PredictaDrive Insurance",
        description: `Rental agreement for ${getCarMMY(formData.selectedCar.metadata)}`,
        image: imageUrl,
        attributes: [
            { trait_type: "Owner Address", value: formData.address },
            { trait_type: "Vehicle Name", value: getCarMMY(formData.selectedCar.metadata) },
            { trait_type: "Start Date", value: formData.startDate },
            { trait_type: "End Date", value: formData.endDate },
            { trait_type: "Drivers Name", value: formData.driverName},
            { trait_type: "Drivers Address", value: formData.driverAddress },
            { trait_type: "Vehicle Token ID", value: formData.selectedCar.token_id }
        ]
    };
}