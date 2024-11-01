'use client';
import { useContext, useState } from 'react';
import styles from './page.module.css';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';
import Button from '@/components/UI/Button';

export default function ManageAccount() {
  const { userInfo } = useContext(LoginContext);
  const { account } = useContext(AccountContext);

  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const onClickAccount = (account: {
    accountNumber: string;
    balance: number;
  }) => {
    setCurrentAccount(account);
  };

  return (
    <main className={styles.wrapper}>
      <h2>{userInfo.nickname}님의 계좌</h2>
      <div className={styles.container}>
        <ul>
          {account.map((account) => (
            <li
              key={account.accountNumber}
              className={styles.accountNumber}
              onClick={onClickAccount.bind(null, account)}
            >
              {account.accountNumber}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button type="button">충전하기</Button>
        <Button type="button">송금하기</Button>
      </div>
      <div className={styles.modal}>
        <h3>{currentAccount.accountNumber}계좌의 정보</h3>
        <p>잔액: {currentAccount.balance}</p>
      </div>
    </main>
  );
}
