import { useAddress, useContract, useTokenBalance } from '@thirdweb-dev/react';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import randomColor from '../../util/randomColor';
import { useState } from 'react';
import ProfileERC721 from '../../components/profile-erc721';
import { ERC20_CONTRACT_ADDRESS } from '../../const/addresses';
import ProfileERC1155 from '../../components/profile-erc1155';

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
];

export default function Profile() {
    const address = useAddress();
    const router = useRouter();

    const [tab, setTab] = useState<"ERC721" | "ERC1155" | "BurnToClaim">("ERC721");

    function truncateAddress(address: string) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const {
        contract: ERC20Contract
    } = useContract(ERC20_CONTRACT_ADDRESS);

    const {
        data: ERC20Balance,
        isLoading: ERC20BalanceIsLoading
    } = useTokenBalance(ERC20Contract, address);

    return (
        <div className={styles.container}>
            {address ? (
                <>
                    <div className={styles.profileHeader}>
                        <div
                        className={styles.coverImage}
                        style={{
                            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                        }}
                        />
                        <div
                        className={styles.profilePicture}
                        style={{
                            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
                        }}
                        />
                    </div>
                    <h3 className={styles.profileAddress}>{truncateAddress(address)}</h3>
                    <p className={styles.profileAddress}>Balance: {
                        ERC20BalanceIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>{ERC20Balance?.displayValue} {ERC20Balance?.symbol}</>
                        )
                    }</p>

                    <div className={styles.tabs}>
                        <h3
                        className={`${styles.tab} 
                        ${tab === "ERC721" ? styles.activeTab : ""}`}
                        onClick={() => setTab("ERC721")}
                        >
                        ERC721
                        </h3>
                        <h3
                        className={`${styles.tab} 
                        ${tab === "ERC1155" ? styles.activeTab : ""}`}
                        onClick={() => setTab("ERC1155")}
                        >
                        ERC1155
                        </h3>
                        <h3
                        className={`${styles.tab}
                        ${tab === "BurnToClaim" ? styles.activeTab : ""}`}
                        onClick={() => setTab("BurnToClaim")}
                        >
                        BurnToClaim
                        </h3>
                    </div>

                    <div
                        className={`${
                        tab === "ERC721" ? styles.activeTabContent : styles.tabContent
                        }`}
                    >
                        <ProfileERC721
                            walletAddress={router.query.address as string}
                        />
                    </div>

                    <div
                        className={`${
                        tab === "ERC1155" ? styles.activeTabContent : styles.tabContent
                        }`}
                    >
                        <ProfileERC1155
                            walletAddress={router.query.address as string}
                        />
                    </div>

                    <div
                        className={`${
                        tab === "BurnToClaim" ? styles.activeTabContent : styles.tabContent
                        }`}
                    >
                        <h3>BurnToClaim</h3>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};