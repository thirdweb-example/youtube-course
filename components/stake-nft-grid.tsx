import type { NFT, NFT as NFTType } from "@thirdweb-dev/sdk";
import styles from "../styles/NFT.module.css";
import StakeNFTCard from "./stake-nft-card";
import { useState } from "react";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../const/addresses";

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    emptyText?: string;
};

export default function StakeNFTGrid({ 
    isLoading, 
    data, 
    emptyText = "No NFTs"
}: Props) {
    const address = useAddress();
    const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);

    function handleSelectNFT(nftId: number) {
        if (selectedNFTs.includes(nftId)) {
            setSelectedNFTs(selectedNFTs.filter((id) => id !== nftId));
        } else {
            setSelectedNFTs([...selectedNFTs, nftId]);
        };
    }

    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
    const {
        contract: StakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);
    
    async function stakeNFT(nftId: number[]) {
        if (!address) return;
        
        const isApproved = await ERC721Contract?.isApproved(
            address,
            STAKING_CONTRACT_ADDRESS
        );

        if (!isApproved) {
            await ERC721Contract?.setApprovalForAll(
                STAKING_CONTRACT_ADDRESS,
                true
            );
        };

        await StakeContract?.call("stake", [nftId]);
    };

    return (
        <div className={styles.stakeSection}>
            <div className={styles.stakeHeader}>
                <h3>Owned:</h3>
                <Web3Button
                    contractAddress={STAKING_CONTRACT_ADDRESS}
                    action={() => stakeNFT(selectedNFTs)}
                    onSuccess={() => {
                        alert("Staked NFTs")
                        setSelectedNFTs([]);
                    }}
                    isDisabled={selectedNFTs.length === 0}
                >{`Stake NFTs (${selectedNFTs.length})`}</Web3Button>
            </div>
            <hr />
            <div className={styles.nftGridContainer}>
                {isLoading ? (
                    [...Array(20)].map((_, index) => (
                        <div key={index} className={styles.nftContainer}>
                            <p>Loading...</p>
                        </div>
                    ))
                ) : data && data.length > 0 ? (
                    data.map((nft, index) => (
                        <div 
                            key={index}
                            className={styles.nftGrid}
                            onClick={() => handleSelectNFT(parseInt(nft.metadata.id))}
                        >
                            <StakeNFTCard
                                nft={nft}
                            />
                        </div>
                    ))
                ) : (
                    <p>{emptyText}</p>
                )}
            </div>
        </div>
    );
};