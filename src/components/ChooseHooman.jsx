import { useState, useEffect } from "react";
import styled from "styled-components";
import EASProvider from "../providers/eas-provider";

const ChooseHoomanContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 25%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Select = styled.select`
  margin-right: 10px;
`;

const Count = styled.span`
  font-size: 12px;
  color: #666;
`;

const ChooseHooman = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const schema =
      "0x8af15e65888f2e3b487e536a4922e277dcfe85b4b18187b0cf9afdb802ba6bb6";
    const easProvider = new EASProvider();

    const fetchAddresses = async () => {
      const attestations = await easProvider.getAttestations(schema);
      const addresses = attestations.map(
        (attestation) => attestation.recipient
      );
      setAddresses(addresses);
    };

    fetchAddresses();
  }, []);

  const handleSelectChange = async (event) => {
    const selectedAddress = event.target.value;
    setSelectedAddress(selectedAddress);

    const schema =
      "0x8af15e65888f2e3b487e536a4922e277dcfe85b4b18187b0cf9afdb802ba6bb6";
    const easProvider = new EASProvider();
    const count = await easProvider.getAttestationCount(
      schema,
      selectedAddress
    );
    setCount(count);
  };

  return (
    <ChooseHoomanContainer>
      <Label>Choose Hooman:</Label>
      <Select value={selectedAddress} onChange={handleSelectChange}>
        <option value="">Select an address</option>
        {addresses.map((address) => (
          <option key={address} value={address}>
            {address}
          </option>
        ))}
      </Select>
      <Count>Attestations: {count}</Count>
    </ChooseHoomanContainer>
  );
};

export default ChooseHooman;
