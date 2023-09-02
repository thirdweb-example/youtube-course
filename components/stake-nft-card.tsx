import { MediaRenderer } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/NFT.module.css";
import { useState } from "react";

type Props = {
    nft: NFT;
};

export default function StakeNFTCard({ nft }: Props) {
    const [isSelected, setIsSelected] = useState(false);
    const borderColor = isSelected ? "#a79af9" : "#222";
    
    return (
        <div
            className={styles.stakeNftContainer}
            onClick={() => setIsSelected(!isSelected)}
            style={{
                border: `2px solid ${borderColor}`,
                width: "50%",
            }}
        >
            <MediaRenderer
                src={nft?.metadata.image}
                width="100%"
                height="auto"
            />
            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nft?.metadata.name}</p>
                <p className={styles.nftTokenId}>Token: #{nft?.metadata.id}</p>
            </div>
        </div>
    )
};