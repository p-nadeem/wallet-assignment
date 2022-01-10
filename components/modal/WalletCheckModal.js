import React, { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



import styles from "../../styles/WalletCheckModal.module.css";

const INJECTED = new InjectedConnector({
  supportedChainIds: [56, 97],
});

function WalletCheckModal({ isOpen, handleClose }) {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const { activate, account, library, deactivate, chainId } = useWeb3React();

  useEffect(() => {
    const getBalance = async () => {
      if (!library) {
        setBalance(null);
      } else {
        const result = await library.eth.getBalance(account);
        setBalance(result);
      }
    };
    getBalance();
  }, [account, library]);

  const handleDisconnectClick = async () => {
    try {
      await deactivate();
      setConnected(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConnectClick = async () => {
    try {
      await activate(INJECTED);
      setConnected(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      maxWidth="xs"
    >
      <DialogTitle className={styles.dialogTitle}>
        <div className={styles.title}>Wallet details</div>
        <IconButton onClick={handleClose}>
          <CloseIcon className={styles.closeButton} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        {connected ? (
          <>
            <div className={styles.tableRow}>
              <div>KEY</div>
              <div>VALUE</div>
            </div>
            <div className={styles.tableRow}>
              <div>Account</div>
              <div className={styles.account}>
                {account
                  ? `${account.substring(0, 4)}...${account.substring(
                      account.length - 4,
                      account.length
                    )}`
                  : null}
              </div>
            </div>
            <div className={styles.tableRow}>
              <div>Chain Id</div>
              <div>{chainId}</div>
            </div>
            <div className={styles.tableRow}>
              <div>Balance</div>
              <div>{(balance / 1000000000000000000).toFixed(2)}</div>
            </div>
            <div className={styles.walletDetails}>Wallet Details</div>
          </>
        ) : (
          <div className={styles.errorMsg}>
            Wallet not connected. Please click to &apos;Connect Now&apos; button
            below.
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {connected ? (
          <Button
            variant="contained"
            color="error"
            className={styles.disconnectButton}
            onClick={handleDisconnectClick}
          >
            Disconnect
          </Button>
        ) : (
          <>
            <div className={styles.modalFooterContainer}>
              <Button
                variant="contained"
                className={styles.footerButton}
                onClick={handleConnectClick}
              >
                Connect Now
              </Button>
            </div>
            <div className={styles.modalFooterContainer}>
              <Button className={styles.cancelButton} onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default WalletCheckModal;
