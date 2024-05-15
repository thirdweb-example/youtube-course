import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import { PROFILE_STATUS_CONTRACT_ADDRESS } from '../../const/addresses';
import styles from '../../styles/Home.module.css';
import { useState } from 'react';

export default function ProfileStatusProject() {
    const address = useAddress();
    const [status, setStatus] = useState("");

    const { contract } = useContract(PROFILE_STATUS_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: profileStatus,
        isLoading: isProfileStatusLoading,
    } = useContractRead(
        contract,
        "userStatus",
        [address]
    );

    const updateStatus = async () => {
        if(!profileStatus.exists) {
            await contract?.call(
                "createStatus",
                [status]
            );
            setStatus("");
            return;
        }
        await contract?.call(
            "updateStatus",
            [status]
        );
        setStatus("");
    };

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
                    <h3>Current Status</h3>
                    {isProfileStatusLoading ? (
                        <p>Loading...</p>
                    ) : (
                        profileStatus.exists ? profileStatus.statusMessage : "No status set."
                    )}
                </div>
                <div className={styles.componentCard}>
                    <h3>Update Status</h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%"
                        }}
                    >
                        <input 
                            type="text" 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                width: "100%",
                                height: "2rem",
                                marginBottom: "1rem"
                            }}
                        />
                        <Web3Button
                            contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS}
                            action={updateStatus}
                        >Update Status</Web3Button>
                    </div>
                </div>
                <div className={styles.componentCard}>
                    <h3>Status Exists</h3>
                    {isProfileStatusLoading ? (
                        <p>Loading status...</p>
                    ) : (
                        profileStatus.existss ? "Yes" : "No"
                    )}
                </div>
            </div>
        </div>
    )
}