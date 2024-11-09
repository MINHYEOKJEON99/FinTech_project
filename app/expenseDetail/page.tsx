'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@/store/accountStore';
import { LoginContext } from '@/store/loginStore';

interface accountType {
  accountNumber: string;
  balance: number;
  expenseDetails?: {
    date: {
      amount: string;
      category: string;
      expenditureDate: string;
    };
  };
}

const CATEGORY = ['all', '고정비', '생활비', '활동비', '친목비', '차량비'];

export default function ExpenseDetails() {
  const router = useRouter();
  const { loginState } = useContext(LoginContext);
  const { account } = useContext(AccountContext);
  const [visibleModal, setVisibleModal] = useState({
    category: false,
    account: false,
  });
  const [type, setType] = useState('all');
  const [filterList, setFilterList] = useState();
  const [currentAccount, setCurrentAccount] = useState<accountType>({
    accountNumber: '',
    balance: 0,
  });

  useEffect(() => {
    const confirmLogin = () => {
      if (!loginState) {
        alert('로그인이 필요합니다');
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  const onClickModal = (modal: 'category' | 'account') => {
    setVisibleModal({ ...visibleModal, [modal]: !visibleModal[modal] });
  };

  const onClickAccount = (account: accountType) => {
    setCurrentAccount(account);
    console.log(currentAccount);
  };
  const onClickCategory = (category: string) => {
    setType(category);
  };

  let content = currentAccount.expenseDetails
    ? Object.values(currentAccount.expenseDetails)
        .filter((el) => {
          if (type !== 'all') {
            return el.category === type;
          } else {
            return el.category;
          }
        })
        .map((expense) => (
          <li key={expense.expenditureDate}>
            <div className={styles.box}>
              <p className={styles.expenditureDate}>
                {expense.expenditureDate}
              </p>
              <p className={styles.amount}>{expense.amount} 원</p>
              <p className={styles.category}>{expense.category}</p>
            </div>
          </li>
        ))
    : '';

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>지출내역</h2>
        <div className={styles.form}>
          <div
            className={styles.accountSelect}
            onClick={onClickModal.bind(null, 'account')}
          >
            {visibleModal.account && (
              <ul className={styles.modal}>
                {account.map((account) => (
                  <li
                    key={account.accountNumber}
                    className={styles.accountNumber}
                    onClick={onClickAccount.bind(null, account)}
                  >
                    {account.accountNumber
                      ? account.accountNumber
                      : '계좌를 선택해주세요'}
                  </li>
                ))}
              </ul>
            )}
            {currentAccount.accountNumber}
          </div>
        </div>
      </div>
      {currentAccount.accountNumber ? (
        <div className={styles.expenseContainer}>
          <h2>{currentAccount.accountNumber} 지출내역</h2>
          <div
            className={styles.categorySelect}
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
            {type ? type : '카테고리'}
          </div>
          <div className={styles.expenseDetailContainer}>
            <ul>
              {content.length
                ? content
                : '해당 카테고리의 지출내역이 없습니다.'}
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}
    </main>
  );
}
