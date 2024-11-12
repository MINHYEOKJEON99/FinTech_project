'use client';
import Button from '@/components/UI/Button';
import styles from './AccountChargeForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';

export default function AccountChargeForm() {
  const router = useRouter();
  const { loginState } = useContext(LoginContext);
  const { account } = useContext(AccountContext);
  const [chargeMoney, setChargeMoney] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    accountSelect: false,
    confirm: false,
  });
  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const { updateAccount } = useContext(AccountContext);

  useEffect(() => {
    const confirmLogin = () => {
      if (loginState) {
        router.push('/accountCharge');
      } else {
        alert('로그인이 필요합니다');
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  const onClickModal = (modal: 'accountSelect' | 'confirm') => {
    setVisibleModal({ ...visibleModal, [modal]: !visibleModal[modal] });
  };

  const onClickAccount = (account: {
    accountNumber: string;
    balance: number;
  }) => {
    setCurrentAccount(account);
    setNewAccount(account);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChargeMoney(e.target.value);
    setNewAccount({
      ...newAccount,
      balance: currentAccount.balance + Number(e.target.value),
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newAccount.accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요');
      return;
    }

    if (+chargeMoney < 0) {
      alert('0원 이상을 입력해주세요');
      return;
    }
    setVisibleModal({ ...visibleModal, confirm: true });
  };

  const confirmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      updateAccount(newAccount);

      router.push('/');
      alert('잔액이 충전되었습니다');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h2>잔액 충전</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <div
            className={styles.accountSelect}
            onClick={onClickModal.bind(null, 'accountSelect')}
          >
            {visibleModal.accountSelect && (
              <ul className={styles.modal}>
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
            )}
            {currentAccount.accountNumber}
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="금액을 입력해주세요"
            value={chargeMoney}
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
          <form onSubmit={confirmHandler} className={styles.submitModal}>
            <p>충전하려는 계좌번호와 금액을 확인해주세요</p>
            <p>계좌번호 : {currentAccount.accountNumber}</p>
            <p>충전 후 금액 : {newAccount.balance} (원)</p>
            <Button type="submit">확인</Button>
          </form>
        </div>
      )}
    </>
  );
}
