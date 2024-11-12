'use client';
import Button from '@/components/UI/Button';

import styles from './PaymentForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';
import clsx from 'clsx';
import SecondPassword from '@/components/SecondPassword';

const CATEGORY = ['고정비', '생활비', '활동비', '친목비', '차량비'];

export default function PaymentForm() {
  const { loginState, secondPassword } = useContext(LoginContext);
  const { account, expense } = useContext(AccountContext);
  const router = useRouter();

  const [remitMoney, setRemitMoney] = useState('');
  const [category, setCategory] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    accountSelect: false,
    confirm: false,
    remitComplete: false,
    secondPassword: false,
    category: false,
  });
  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const getCurrentTimeString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  //사이드 이펙트

  useEffect(() => {
    const confirmLogin = () => {
      if (!loginState) {
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  // 이벤트 핸들러

  const onClickModal = (
    modal:
      | 'accountSelect'
      | 'confirm'
      | 'remitComplete'
      | 'accountSelect'
      | 'category'
  ) => {
    setVisibleModal({ ...visibleModal, [modal]: !visibleModal[modal] });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemitMoney(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category.trim() === '') {
      alert('카테고리를 선택해주세요');
      return;
    }

    if (currentAccount.accountNumber.trim() === '') {
      alert('계좌를 선택해주세요');
    }

    if (+remitMoney < 0) {
      alert('0원 이상을 입력해주세요');
      return;
    }

    if (currentAccount.balance - +remitMoney < 0) {
      alert('잔액이 부족합니다');
      return;
    }

    setVisibleModal({ ...visibleModal, confirm: true });
  };

  const onCheck = () => {
    setVisibleModal({ ...visibleModal, confirm: false, secondPassword: true });
  };
  const onConfirm = () => {
    const now = getCurrentTimeString();
    const key = new Date().toString();

    expense(
      {
        ...currentAccount,
        balance: currentAccount.balance - Number(remitMoney),
        expenseDetails: {
          category,
          amount: remitMoney,
          expenditureDate: now,
        },
      },
      key
    );

    setVisibleModal({
      ...visibleModal,
      secondPassword: false,
      remitComplete: true,
    });

    setRemitMoney('');
  };

  const onCloseSecondPw = () => {
    setVisibleModal({ ...visibleModal, secondPassword: false });
  };

  const onClickAccount = (account: {
    accountNumber: string;
    balance: number;
  }) => {
    setCurrentAccount(account);
  };

  const onClickCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <>
      <div className={styles.container}>
        <h2>결제하기</h2>
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
            {currentAccount.accountNumber || '계좌를 선택해주세요'}
          </div>
          <div
            className={styles.accountSelect}
            onClick={onClickModal.bind(null, 'category')}
          >
            {visibleModal.category && (
              <ul className={styles.modal}>
                {CATEGORY.map((category) => (
                  <li
                    key={category}
                    className={styles.accountNumber}
                    onClick={onClickCategory.bind(null, category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
            {category || '카테고리를 선택해주세요'}
          </div>

          <input
            type="number"
            className={clsx(styles.input, {
              [styles.invalidInput]:
                currentAccount.balance - Number(remitMoney) < 0,
            })}
            placeholder="금액을 입력해주세요"
            value={remitMoney}
            onChange={onChange}
          />
          <p className={styles.inValidMoney}>
            {currentAccount.balance - Number(remitMoney) < 0 &&
              '잔액이 부족합니다'}
          </p>
          <Button type="submit" styles={styles.button}>
            결제하기
          </Button>
        </form>
      </div>
      {visibleModal.confirm && (
        <div className={styles.modalBackground}>
          <div className={styles.submitModal}>
            <p>결제하려는 카테고리와 금액을 확인해주세요</p>
            <p>카테고리 : {category}</p>
            <p>결제 할 금액 : {remitMoney} (원)</p>
            <Button type="submit" onClickHandler={onCheck}>
              확인
            </Button>
            <Button
              type="button"
              onClickHandler={onClickModal.bind(null, 'confirm')}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
      {visibleModal.secondPassword && (
        <>
          <div className={styles.closeModal}>닫기</div>
          <SecondPassword
            mode={secondPassword ? 'confirm' : 'set'}
            onClose={onCloseSecondPw}
            onConfirm={onConfirm}
          />
        </>
      )}
      {visibleModal.remitComplete && (
        <div className={styles.modalBackground}>
          <div className={styles.submitModal}>
            <h3>결제가 완료되었습니다</h3>
            <Button
              type="button"
              onClickHandler={onClickModal.bind(null, 'remitComplete')}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
