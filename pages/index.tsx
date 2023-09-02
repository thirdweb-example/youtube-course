import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS } from "../const/addresses";

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract: ERC721Contract
  } = useContract(ERC721_CONTRACT_ADDRESS);
  const {
    data: ERC721ContractMetadata,
    isLoading: ERC721ContractMetadataIsLoading
  } = useContractMetadata(ERC721Contract);

  const {
    data: ERC721ClaimCondition,
    isLoading: ERC721ClaimConditionIsLoading
  } = useActiveClaimCondition(ERC721Contract);

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <div>
          <h1>ERC721 NFT</h1>
          <p>Claim your ERC721 NFT here. You can claim 1 NFT which can be used to earn tokens. Earn enough tokens and claim new NFTs.</p>
          <p>Cost: {ERC721ClaimCondition?.currencyMetadata.displayValue} {ERC721ClaimCondition?.currencyMetadata.symbol}</p>
          {address ? (
            <Web3Button
              contractAddress={ERC721_CONTRACT_ADDRESS}
              action={(contract) => contract.erc721.claim(1)}
              onSuccess={() => alert("Claimed NFT")}
            >Claim NFT</Web3Button>
          ) : (
            <p>Connect to claim</p>
          )}
        </div>
        <div className={styles.heroImageContainer}>
          {!ERC721ContractMetadataIsLoading ? (
            <div className={styles.heroImage}>
              <MediaRenderer
                src={ERC721ContractMetadata?.image}
                height="80%"
                width="80%"
              />
              <p>{ERC721ContractMetadata?.name}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
