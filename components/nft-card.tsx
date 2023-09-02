import { MediaRenderer } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/NFT.module.css";

type Props = {
    nft: NFT;
};

export default function NFTCard({ nft }: Props) {
    return (
        <>
            <MediaRenderer
                src={nft.metadata.image}
                width="100%"
                height="auto"
            />
            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nft.metadata.name}</p>
                <p className={styles.nftTokenId}>Token: #{nft.metadata.id}</p>
            </div>
        </>
    );
};