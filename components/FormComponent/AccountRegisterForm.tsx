'use client';
import Button from '@/components/UI/Button';
import styles from './AccountRegisterForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';

export default function AccountRegisterForm() {
  const router = useRouter();
  const { loginState } = useContext(LoginContext);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  const { addAccount } = useContext(AccountContext);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, accountNumber: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newAccount.accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요');
      return;
    }

    try {
      addAccount(newAccount);

      router.push('/');
      alert('계좌가 등록되었습니다');
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
  );
}
