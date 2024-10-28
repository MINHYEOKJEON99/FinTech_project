'use client';
import Button from '@/components/UI/Button';
import styles from './page.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { get, ref, update } from 'firebase/database';
import { db } from '../firebase';

export default function AccountRegister() {
  const router = useRouter();
  const { loginState, userKey } = useContext(LoginContext);
  const [account, setAccount] = useState([]);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  useEffect(() => {
    const confirmLogin = () => {
      if (loginState) {
        router.push('/accountRegister');
      } else {
        alert('로그인이 필요합니다');
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsRef = ref(db, `users/${userKey}/account`);
      const snapshot = await get(accountsRef);
      if (snapshot.exists()) {
        setAccount(snapshot.val() || []); // 기존 계좌 정보 가져오기
      } else {
        console.log('No account data found');
      }
    };

    fetchAccounts();
  }, [userKey]); // userKey가 변경될 때 계좌 정보 가져오기

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, accountNumber: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newAccount.accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요');
      return;
    }

    const updatedAccounts = [...account, newAccount];

    try {
      update(ref(db, `users/${userKey}`), {
        account: updatedAccounts,
      });

      router.push('/');
      alert('계좌가 등록되었습니다');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>계좌 등록</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="number"
            className={styles.input}
            placeholder="- 없이 입력해주세요"
            value={newAccount.accountNumber}
            onChange={onChange}
          />
          <Button type="submit" styles={styles.button}>
            등록
          </Button>
        </form>
      </div>
    </main>
  );
}
