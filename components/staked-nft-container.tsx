import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/NFT.module.css";
import { STAKING_CONTRACT_ADDRESS } from "../const/addresses";
import StakedNFTCard from "./staked-nft-card";
import { BigNumber } from "ethers";
import { useState } from "react";

export default function StakedNFTContainer() {
    const address = useAddress();
    const [selectStakedNFT, setSelectStakedNFT] = useState<number[]>([]);

    function handleSelectStakedNFT(nftId: number) {
        if (selectStakedNFT.includes(nftId)) {
            setSelectStakedNFT(selectStakedNFT.filter((id) => id !== nftId));
        } else {
            setSelectStakedNFT([...selectStakedNFT, nftId]);
        };
    };

    const {
        contract: StakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

    const {
        data: stakedERC721Tokens,
        isLoading: stakedERC721TokensIsLoading
    } = useContractRead(
        StakeContract,
        "getStakeInfo",
        [address]
    );
    
    return (
        <div className={styles.stakeSection}>
            <div className={styles.stakeHeader}>
                <h3>Staked:</h3>
                <Web3Button
                    contractAddress={STAKING_CONTRACT_ADDRESS}
                    action={(contract) => contract.call(
                        "withdraw",
                        [selectStakedNFT]
                    )}
                    isDisabled={selectStakedNFT.length === 0}
                    onSuccess={() => {
                        setSelectStakedNFT([]);
                        alert("Unstaked NFTs");
                    }}
                >{`Unstake NFTs (${selectStakedNFT.length})`}</Web3Button>
            </div>
            <hr />
            <div className={styles.nftGridContainer}>
                {stakedERC721Tokens && stakedERC721Tokens[0].length > 0 ? (
                    stakedERC721Tokens[0].map((stakedNFT: BigNumber, index: number) => (
                        <div
                            key={index}
                            className={styles.nftGrid}
                            onClick={() => handleSelectStakedNFT(stakedNFT.toNumber())}
                        >
                            <StakedNFTCard
                                tokenId={stakedNFT.toNumber()}
                            />
                        </div>
                    ))
                ) : (
                    <p>No NFTs staked</p>
                )}
            </div>
        </div>
    )
};