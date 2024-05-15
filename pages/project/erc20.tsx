import { Web3Button, useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import styles from '../../styles/Home.module.css';
import { ERC20_CONTRACT_ADDRESS } from '../../const/addresses';
import Link from 'next/link';

export default function ERC20Project() {
    const address = useAddress();

    const { contract } =useContract(ERC20_CONTRACT_ADDRESS, "token");

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: tokenSupply,
        isLoading: isTokenSupplyLoading,
    } = useTokenSupply(contract);

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(contract, address);

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
                    <h3>Token Stats</h3>
                    {isTokenSupplyLoading ? (
                        <p>Loading supply...</p>
                    ) : (
                        <p>Total Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                    )}
                </div>
                <div className={styles.componentCard}>
                    <h3>Token Balance</h3>
                    {isTokenBalanceLoading ? (
                        <p>Loading balance...</p>
                    ) : (
                        <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                    )}
                    <Web3Button
                        contractAddress={ERC20_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc20.burn(10)}
                    >Burn 10 Tokens</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Earn Tokens</h3>
                    <p>Earn more tokens by staking an ERC-721 NFT.</p>
                    <div>
                        <Link href='/project/staking'>
                            <button className={styles.matchButton}>Stake ERC-721</button>
                        </Link>
                        <Link href='/project/staking'>
                            <button className={styles.matchButton}>Stake ERC-721</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}