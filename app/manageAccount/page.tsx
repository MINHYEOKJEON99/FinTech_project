'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './page.module.css';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ManageAccount() {
  const { userInfo, loginState } = useContext(LoginContext);
  const { account, deleteAccount } = useContext(AccountContext);
  const [visible, setVisible] = useState(false);

  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const confirmLogin = () => {
      if (!loginState) {
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

  const onClickCharge = () => {
    router.push(`/accountCharge`);
  };

  const onDelete = () => {
    const deleteValid = confirm('삭제하시겠습니까?');

    if (deleteValid) {
      try {
        deleteAccount(currentAccount.accountNumber);
        alert('삭제되었습니다.');
        setVisible(false);
      } catch (e) {
        console.log(e);
        console.log(currentAccount.accountNumber);
      }
    }
  };

  return (
    <>
      {loginState && (
        <main className={styles.wrapper}>
          <h2 className={styles.h2}>{userInfo.nickname}님의 계좌</h2>
          {account.length ? (
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
          ) : (
            <div className={styles.noAccount}>
              <p>계좌가 없습니다.</p>
              <Link href={'/accountRegister'}>
                <Button type="button">계좌생성하러가기</Button>
              </Link>
            </div>
          )}
          {account.length ? (
            <div className={styles.outButtonContainer}>
              <Link href="/accountCharge">
                <Button type="button">충전하기</Button>
              </Link>
              <Link href="/expenseDetail">
                <Button type="button">지출내역</Button>
              </Link>
            </div>
          ) : (
            ''
          )}
          {visible && (
            <div className={styles.modalBackground}>
              <div className={styles.modal}>
                <div className={styles.close} onClick={onClickBack}>
                  닫기
                </div>
                <h3>{currentAccount.accountNumber}계좌의 정보</h3>
                <p>잔액: {currentAccount.balance}</p>
                <div className={styles.buttonContainer}>
                  <Button onClickHandler={onClickRemit} type="button">
                    송금하기
                  </Button>

                  <Button type="button" onClickHandler={onClickCharge}>
                    잔액충전
                  </Button>

                  <Button
                    type="button"
                    onClickHandler={onDelete}
                    styles={styles.delete}
                  >
                    계좌 삭제
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
