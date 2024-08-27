import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

const eas = new EAS(EASContractAddress);

const provider = ethers.getDefaultProvider("sepolia");

eas.connect(provider);

const EASProvider = {
  getAttestation: async (uid) => {
    return await eas.getAttestation(uid);
  },

  createOnchainAttestation: async (schema, data) => {
    const schemaEncoder = new SchemaEncoder(schema);
    const encodedData = schemaEncoder.encodeData(data);
    return await eas.attest({
      schema,
      data: {
        recipient: data.recipient,
        expirationTime: data.expirationTime,
        revocable: data.revocable,
        refUID: data.refUID,
        data: encodedData,
      },
    });
  },

  revokeOnchainAttestation: async (schema, uid) => {
    return await eas.revoke({
      schema,
      data: { uid },
    });
  },

  createOffchainAttestation: async (schema, data, signer) => {
    const offchain = await eas.getOffchain();
    const schemaEncoder = new SchemaEncoder(schema);
    const encodedData = schemaEncoder.encodeData(data);
    return await offchain.signOffchainAttestation(
      {
        recipient: data.recipient,
        expirationTime: data.expirationTime,
        time: data.time,
        revocable: data.revocable,
        schema,
        refUID: data.refUID,
        data: encodedData,
      },
      signer
    );
  },

  createDelegatedOnchainAttestation: async (schema, data, signer) => {
    const delegated = await eas.getDelegated();
    const schemaEncoder = new SchemaEncoder(schema);
    const encodedData = schemaEncoder.encodeData(data);
    const response = await delegated.signDelegatedAttestation(
      {
        schema,
        recipient: data.recipient,
        expirationTime: data.expirationTime,
        revocable: data.revocable,
        refUID: data.refUID,
        data: encodedData,
        deadline: data.deadline,
        value: data.value,
      },
      signer
    );
    return await eas.attestByDelegation({
      schema,
      data: {
        recipient: data.recipient,
        expirationTime: data.expirationTime,
        revocable: data.revocable,
        refUID: data.refUID,
        data: encodedData,
      },
      signature: response.signature,
      attester: await signer.getAddress(),
      deadline: data.deadline,
    });
  },

  revokeDelegatedOnchainAttestation: async (schema, uid, signer) => {
    const delegated = await eas.getDelegated();
    const response = await delegated.signDelegatedRevocation(
      {
        schema,
        uid,
        deadline: 0n,
        value: 0n,
      },
      signer
    );
    return await eas.revokeByDelegation({
      schema,
      data: { uid },
      signature: response.signature,
      revoker: await signer.getAddress(),
      deadline: 0n,
    });
  },

  createTimestamp: async (uid) => {
    return await eas.timestamp(uid);
  },

  createTimestampForData: async (data) => {
    return await eas.timestamp(data);
  },

  createMultiTimestamp: async (data) => {
    return await eas.multiTimestamp(data);
  },

  getAttestations: async (schema) => {
    const attestations = await eas.getAttestations(schema);
    return attestations;
  },

  getAttestationCount: async (schema, address) => {
    const count = await eas.getAttestationCount(schema, address);
    return count;
  },
};

export default EASProvider;
