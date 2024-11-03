'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './page.module.css';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ManageAccount() {
  const { userInfo } = useContext(LoginContext);
  const { account } = useContext(AccountContext);

  const [visible, setVisible] = useState(false);

  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const { loginState } = useContext(LoginContext);

  const router = useRouter();

  useEffect(() => {
    const confirmLogin = () => {
      if (loginState) {
        router.push('/manageAccount');
      } else {
        alert('로그인이 필요합니다');
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  const onClickAccount = (account: {
    accountNumber: string;
    balance: number;
  }) => {
    setCurrentAccount(account);
    setVisible(true);
  };

  const onClickBack = () => {
    setVisible(false);
  };

  const onClickRemit = () => {
    router.push(`/remittance/${currentAccount.accountNumber}`);
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.h2}>{userInfo.nickname}님의 계좌</h2>
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

      <Link href="/accountCharge">
        <Button type="button">충전하기</Button>
      </Link>

      {visible && (
        <div className={styles.modalBackground}>
          <div className={styles.modal}>
            <h3>{currentAccount.accountNumber}계좌의 정보</h3>
            <p>잔액: {currentAccount.balance}</p>
            <div className={styles.buttonContainer}>
              <Button onClickHandler={onClickRemit} type="button">
                송금하기
              </Button>
              <Button
                onClickHandler={onClickBack}
                styles={styles.closeButton}
                type="button"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
