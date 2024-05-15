import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ERC1155_CONTRACT_ADDRESS, ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, PROFILE_STATUS_CONTRACT_ADDRESS, TIP_JAR_CONTRACT_ADDRESS } from "../const/addresses";
import ContractCard from "../components/contract-card";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My {" "}
            <span className={styles.gradientText0}>
              Contracts
            </span>
          </h1>

          <p className={styles.description}>Select a contract to interact with.</p>
        </div>
        <div className={styles.grid}>
          <ContractCard
            href="/project/erc20"
            contractAddress={ERC20_CONTRACT_ADDRESS}
            title="ERC-20"
            description="A standard interface for non-fungible tokens."
          />
          <ContractCard
            href="/project/erc721"
            contractAddress={ERC721_CONTRACT_ADDRESS}
            title="ERC-721"
            description="A standard interface for non-fungible tokens."
          />
          <ContractCard
            href="/project/erc1155"
            contractAddress={ERC1155_CONTRACT_ADDRESS}
            title="ERC-1155"
            description="A standard interface for non-fungible tokens."
          />
          <ContractCard
            href="/project/tipJar"
            contractAddress={TIP_JAR_CONTRACT_ADDRESS}
            title="Tip Jar"
            description="A standard interface for non-fungible tokens."
          />
          <ContractCard
            href="/project/profileStatus"
            contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS}
            title="Profile Status"
            description="A standard interface for non-fungible tokens."
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
