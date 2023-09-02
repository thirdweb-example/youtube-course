import { useContract, useNFT } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS } from "../const/addresses";
import StakeNFTCard from "./stake-nft-card";

type Props = {
    tokenId: number;
};

export default function StakedNFTCard({ tokenId }: Props) {
    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS);

    const {
        data: nft,
        isLoading: nftIsLoading
    } = useNFT(ERC721Contract, tokenId);
    
    return (
        <StakeNFTCard
            nft={nft!}
        />
    )
};