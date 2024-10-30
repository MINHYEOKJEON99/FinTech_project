'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './Balance.module.css';
import { get, ref } from 'firebase/database';
import { db } from '@/app/firebase';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';

interface accountType {
  accountNumber: string;
  balance: number;
}

export default function Balance() {
  const { account } = useContext(AccountContext);

  return (
    <div>
      {account.length ? (
        <>
          {account.map((account: accountType) => (
            <div key={account.accountNumber} className={styles.container}>
              <p className={styles.fontP}>
                <span className={styles.font}>계좌번호</span> :{' '}
                {account.accountNumber}
              </p>
              <p className={styles.fontP}>
                <span className={styles.font}>잔액</span> : {account.balance}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>계좌를 생성해주세요</p>
      )}
    </div>
  );
}
