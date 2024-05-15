import { Web3Button, useAddress, useContract, useContractMetadata, useOwnedNFTs, useTotalCirculatingSupply, useTotalCount } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import { ERC1155_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS } from '../../const/addresses';
import styles from '../../styles/Home.module.css';

export default function ERC1155Project() {
    const address = useAddress();
    const { contract } = useContract(ERC1155_CONTRACT_ADDRESS, "edition-drop");

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
    } = useTotalCirculatingSupply(contract, 0);

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
                    <h3>Claim ERC-1155</h3>
                    <p>Claim an ERC-1155 NFT for FREE!</p>
                    <Web3Button
                        contractAddress={ERC721_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc1155.claim(0, 1)}
                    >Claim NFT</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>
                        Total Amount of Tokens:
                        {isTotalSupplyLoading ? (
                            "Loading supply..."
                        ) : (
                            ` ${totalSupply?.toNumber()}`
                        )}
                    </p>
                    <p>
                        Total Token ID #0:
                        {isTotalClaimedSupplyLoading ? (
                            "Loading claimed..."
                        ) : (
                            ` ${totalClaimedSupply?.toNumber()}`
                        )}
                    </p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    {isOwnedNFTsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <p key={nft.metadata.id}>Token ID#{nft.metadata.id}: {nft.quantityOwned}</p>
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