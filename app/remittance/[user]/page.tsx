'use client';
import Button from '@/components/UI/Button';
import styles from './page.module.css';
import { use, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';

export default function Remittance({ params }: any) {
  const { userInfo } = useContext(LoginContext);

  const [remitMoney, setRemitMoney] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    accountSelect: false,
    confirm: false,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params; // `await`로 `params`를 unwrap
      setUser(resolvedParams.user);
    }
    fetchParams();
  }, [params]);

  // useEffect(() => {
  //   const confirmLogin = () => {
  //     if (loginState) {
  //       router.push('/accountCharge');
  //     } else {
  //       alert('로그인이 필요합니다');
  //       router.push('/login');
  //     }
  //   };

  //   confirmLogin();
  // }, []);

  const onClickModal = (modal: 'accountSelect' | 'confirm') => {
    setVisibleModal({ ...visibleModal, [modal]: !visibleModal[modal] });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemitMoney(e.target.value);
  };

  const onChangeAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요');
      return;
    }

    if (+remitMoney < 0) {
      alert('0원 이상을 입력해주세요');
      return;
    }
    setVisibleModal({ ...visibleModal, confirm: true });
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.h2}>
        {userInfo.nickname}의 계좌 {user}
      </h2>
      <div className={styles.container}>
        <h2>송금하기</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="송금할 계좌를 입력해주세요"
            onChange={onChangeAccountNumber}
            value={accountNumber}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="금액을 입력해주세요"
            value={remitMoney}
            onChange={onChange}
          />
          <Button type="submit" styles={styles.button}>
            충전하기
          </Button>
        </form>
      </div>
      {visibleModal.confirm && (
        <div
          className={styles.modalBackground}
          onClick={onClickModal.bind(null, 'confirm')}
        >
          <div className={styles.submitModal}>
            <p>송금하려는 계좌번호와 금액을 확인해주세요</p>
            {/* <p>계좌번호 : {currentAccount.accountNumber}</p>
            <p>충전 후 금액 : {newAccount.balance} (원)</p> 
            <Button onClickHandler={confirmHandler} type="submit">
              확인
            </Button> */}
          </div>
        </div>
      )}
    </main>
  );
}
