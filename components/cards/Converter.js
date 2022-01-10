import Image from "next/image";
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SwapIcon from "../../assets/images/swap.png";

import styles from "../../styles/Converter.module.css";

function Conveter({ setModalOpen }) {
  const numberRule = /^\d*\.?\d{0,2}$/;
  const conversionRate = 3;

  const [nep, setNep] = useState("");
  const [busd, setBusd] = useState("");

  const handleBusdChange = (e) => {
    if (e.target.value && !numberRule.test(e.target.value)) return;
    setBusd(e.target.value);
    if (!e.target.value) {
      setNep("");
      return;
    }
    const totalNep = e.target.value / conversionRate;
    setNep(totalNep.toFixed(2));
  };

  const handleNepChange = (e) => {
    if (e.target.value && !numberRule.test(e.target.value)) return;
    setNep(e.target.value);
    if (!e.target.value) {
      setBusd("");
      return;
    }
    const totalBusd = e.target.value * conversionRate;
    setBusd(totalBusd.toFixed(2));
  };

  return (
    <div>
      <Card sx={{ minWidth: 500 }} className={styles.conveterCard}>
        <CardContent className={styles.conveterCardContent}>
          <Typography variant="h5" className={styles.title}>
            Crypto Converter
          </Typography>
          <div>
            <Typography className={styles.label}>NEP</Typography>
            <TextField
              placeholder="0.00"
              fullWidth
              value={nep}
              onChange={handleNepChange}
              type="text"
              InputProps={{
                classes: { input: styles.input },
                inputMode: "numeric",
              }}
            />
          </div>
          <div className={styles.swapIcon}>
            <Image src={SwapIcon} height={30} width={30} />
          </div>
          <div>
            <Typography className={styles.label}>BUSD</Typography>
            <TextField
              placeholder="0.00"
              fullWidth
              value={busd}
              onChange={handleBusdChange}
              type="text"
              InputProps={{
                classes: { input: styles.input },
                inputMode: "numeric",
              }}
            />
          </div>
          <div>
            <Button
              variant="text"
              onClick={setModalOpen}
              className={styles.footerText}
            >
              Check Wallet Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Conveter;
