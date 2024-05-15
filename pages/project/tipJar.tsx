import { Web3Button, toEther, toWei, useAddress, useContract, useContractMetadata, useContractRead } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import { TIP_JAR_CONTRACT_ADDRESS } from '../../const/addresses';
import styles from '../../styles/Home.module.css';

export default function TipJarProject() {
    const address = useAddress();
    const { contract } = useContract(TIP_JAR_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: tipJarBalance,
        isLoading: isTipJarBalanceLoading,
    } = useContractRead(
        contract,
        "getBalance",
    );

    const {
        data: owner,
        isLoading: isOwnerLoading,
    } = useContractRead(
        contract,
        "owner",
    );
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
                    <h3>Leave a Tip</h3>
                    <p>Tip in MATIC and record it on the blockchain.</p>
                    <Web3Button
                        contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                        action={(contract) => contract.call(
                            "sendTip",
                            [],
                            {
                                value: toWei(0.001)
                            }
                        )}
                    >{`Tip (0.001 MATIC)`}</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Tip Jar Balance</h3>
                    {isTipJarBalanceLoading ? (
                        <p>Loading balance...</p>
                    ) : (
                        <p>Balance: {toEther(tipJarBalance.toNumber())}</p>
                    )}
                </div>
                <div className={styles.componentCard}>
                    <h3>Withdraw Balance</h3>
                    {isOwnerLoading ? (
                        <p>Loading owner...</p>
                    ) : (
                        owner === address ? (
                            <Web3Button
                                contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                                action={(contract) => contract.call(
                                    "withdrawTips",
                                    [],
                                )}
                                onSuccess={() => alert("Balance withdrawn!")}
                            >Withdraw Balance</Web3Button>
                        ) : (
                            <p>Only the owner can withdraw the balance.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}