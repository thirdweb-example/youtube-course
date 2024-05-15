import { ConnectWallet } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <p
                    className={styles.gradientText1}
                    style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                    }}
                >
                    thirdweb Web3 Developer Course
                </p>
            </Link>
            <ConnectWallet 
                btnTitle='Sign In'
                modalTitle='Select sign in method'
                detailsBtn={() => {
                    return <p>Profile</p>
                }}
            />
        </div>
    );
};