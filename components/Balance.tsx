'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './Balance.module.css';
import { get, ref } from 'firebase/database';
import { db } from '@/app/firebase';
import { LoginContext } from '@/store/loginStore';

interface accountType {
  accountNumber: string;
  balance: number;
}

export default function Balance() {
  const [balance, setBalance] = useState([]);
  const { userKey } = useContext(LoginContext);

  console.log(Boolean(userKey));

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsRef = ref(db, `users/${userKey}/account`);
      const snapshot = await get(accountsRef);
      if (snapshot.exists()) {
        setBalance(snapshot.val() || []); // 기존 계좌 정보 가져오기
      } else {
        console.log('No account data found');
      }
    };

    fetchAccounts();
  }, [userKey]); // userKey가 변경될 때 계좌 정보 가져오기

  return (
    <div>
      {balance.length ? (
        <>
          {balance.map((account: accountType) => (
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
