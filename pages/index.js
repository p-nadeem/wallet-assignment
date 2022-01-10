import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import Conveter from "../components/cards/Converter";
const WalletDetailsModal = dynamic(() =>  import("../components/modal/WalletCheckModal"));

import NeptuneImage from "../assets/images/neptune-mutual.png";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={NeptuneImage} />
      </div>
      <div className={styles.conveterContainer}>
        <Conveter setModalOpen={setWalletModalOpen} />
      </div>
      <WalletDetailsModal
        isOpen={isWalletModalOpen}
        handleClose={() => setWalletModalOpen(false)}
      />
    </div>
  );
}
