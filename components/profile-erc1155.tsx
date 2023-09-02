import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Profile.module.css";
import { ERC1155_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS } from "../const/addresses";
import NFTGrid from "./nft-grid";

type Props = {
    walletAddress: string;
};

export default function ProfileERC1155({ walletAddress }: Props) {
    const address = useAddress();

    const {
        contract: ERC1155Contract
    } = useContract(ERC1155_CONTRACT_ADDRESS);

    const {
        data: ownedERC721Tokens,
        isLoading: ownedERC721TokensIsLoading
    } = useOwnedNFTs(ERC1155Contract, walletAddress);

    return (
        <div className={styles.container}>
            <h3>Total Owned: {ownedERC721Tokens?.length}</h3>
            <NFTGrid
                isLoading={ownedERC721TokensIsLoading}
                data={ownedERC721Tokens}
            />
        </div>
    );
};