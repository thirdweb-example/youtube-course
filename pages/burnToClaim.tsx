import { MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { BURTOCLAIM_CONTRACT_ADDRESS, ERC1155_CONTRACT_ADDRESS } from "../const/addresses";
import styles from "../styles/Home.module.css";

export default function ERC1155() {
    const address = useAddress();

    const {
        contract: BurnToClaimContract
    } = useContract(BURTOCLAIM_CONTRACT_ADDRESS);

    const {
        contract: ERC1155Contract
    } = useContract(ERC1155_CONTRACT_ADDRESS, "edition-drop");

    const {
        data: BurnToClaimContractMetadata,
        isLoading: BurnToClaimContractMetadataIsLoading
    } = useContractMetadata(BurnToClaimContract);

    async function claimNFT() {
        if (!address) return;
        
        const isApproved = await ERC1155Contract?.call(
            "isApprovedForAll",
            [address, BURTOCLAIM_CONTRACT_ADDRESS]
        );

        if(!isApproved) {
            const tx = await ERC1155Contract?.call(
                "setApprovalForAll",
                [BURTOCLAIM_CONTRACT_ADDRESS, true]
            );
        }

        const claimTx = await BurnToClaimContract?.call(
            "claim",
            [address, 1]
        );
    };


    return (
        <div className={styles.container}>
            <div className={styles.heroContainer}>
                <div>
                <h1>Burn To Claim</h1>
                <p>Claim an ERC721 token by burning your ERC1155 token.</p>
                {address ? (
                    <Web3Button
                    contractAddress={ERC1155_CONTRACT_ADDRESS}
                    action={() => claimNFT()}
                    onSuccess={() => alert("Claimed NFT")}
                    onError={(error) => alert(error.message)}
                    >Claim NFT</Web3Button>
                ) : (
                    <p>Connect to claim</p>
                )}
                </div>
                <div className={styles.heroImageContainer}>
                {!BurnToClaimContractMetadataIsLoading ? (
                    <div className={styles.heroImage}>
                    <MediaRenderer
                        src={BurnToClaimContractMetadata?.image}
                        height="80%"
                        width="80%"
                    />
                    <p>{BurnToClaimContractMetadata?.name}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                </div>
            </div>
        </div>
    );
};