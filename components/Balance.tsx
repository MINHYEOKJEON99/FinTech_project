'use client';

import { useContext } from 'react';
import styles from './Balance.module.css';

import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';

interface accountType {
  accountNumber: string;
  balance: number;
}

export default function Balance() {
  const { userKey } = useContext(LoginContext);
  const { account } = useContext(AccountContext);

  const loginContent = account.length ? (
    <>
      {account.map((account: accountType) => (
        <div key={account.accountNumber} className={styles.container}>
          <p className={styles.fontP}>
            <span className={styles.font}>계좌번호</span> :
            {account.accountNumber}
          </p>
          <p className={styles.fontP}>
            <span className={styles.font}>잔액</span> : {account.balance}
          </p>
        </div>
      ))}
    </>
  ) : (
    <p className={styles.p}>계좌를 생성해주세요</p>
  );

  const logoutContent = <p className={styles.p}>로그인이 필요합니다.</p>;
  return <div>{userKey ? loginContent : logoutContent}</div>;
}
