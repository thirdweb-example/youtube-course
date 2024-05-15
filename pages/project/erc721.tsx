import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import { ERC721_CONTRACT_ADDRESS } from '../../const/addresses';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function ERC721Project() {
    const address = useAddress();
    const { contract } = useContract(ERC721_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: totalSupply,
        isLoading: isTotalSupplyLoading,
    } = useTotalCount(contract);

    const {
        data: totalClaimedSupply,
        isLoading: isTotalClaimedSupplyLoading,
    } = useClaimedNFTSupply(contract);

    const {
        data: ownedNFTs,
        isLoading: isOwnedNFTsLoading,
    } = useOwnedNFTs(contract, address);
    
    return (
        <div className={styles.container}>
            <HeroCard
                isLoading={isContractMetadataLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}            
            />
            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3>Claim ERC-721</h3>
                    <p>Claim an ERC-721 NFT for FREE!</p>
                    <Web3Button
                        contractAddress={ERC721_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc721.claim(1)}
                    >Claim NFT</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>
                        Total Supply:
                        {isTotalSupplyLoading ? (
                            "Loading supply..."
                        ) : (
                            ` ${totalSupply?.toNumber()}`
                        )}
                    </p>
                    <p>
                        Total Claimed:
                        {isTotalClaimedSupplyLoading ? (
                            "Loading claimed..."
                        ) : (
                            ` ${totalClaimedSupply?.toNumber()}`
                        )}
                    </p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    <p>
                        Total Owned:
                        {isOwnedNFTsLoading ? (
                            "Loading owned..."
                        ) : (
                            ` ${ownedNFTs?.length}`
                        )}
                    </p>
                </div>
            </div>
            <div className={styles.container}>
                <h2>My NFTs:</h2>
                <div className={styles.grid} style={{ justifyContent: "flex-start"}}>
                    {isOwnedNFTsLoading ? (
                        <p>Loading NFTs...</p>
                    ) : (
                        ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <div className={styles.card} key={nft.metadata.id}>
                                    <ThirdwebNftMedia
                                        metadata={nft.metadata}
                                    />
                                    <div className={styles.cardText}>
                                        <h2>{nft.metadata.name}</h2>
                                    </div>
                                    <Link href="/project/staking">
                                        <button
                                            className={styles.matchButton}
                                            style={{
                                                width: "100%",
                                                borderRadius: "0 0 8px 8px"
                                            }}
                                        >Stake NFT</button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No NFTs owned.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}