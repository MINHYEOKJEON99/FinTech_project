'use client';

import Link from 'next/link';
import styles from './Nav.module.css';
import app from '@/app/firebase';
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { LoginContext } from '@/store/loginStore';

export default function Nav() {
  const auth = getAuth(app);
  const { loginState, logout } = useContext(LoginContext);

  const onClickLogOut = async () => {
    logout();
  };

  return (
    <nav className={styles.container}>
      <h2>
        <Link href={'/'}>FinTech</Link>
      </h2>
      <div className={styles.menu}>
        <ul className={styles.list}>
          <li>
            <Link href={'/manageAccount'}>계좌관리</Link>
          </li>
          <li>
            <Link href={'/accountRegister'}>계좌등록</Link>
          </li>
          <li>
            <Link href={'/accountCharge'}>잔액충전</Link>
          </li>
          <li>
            <Link href={'/payment'}>결제</Link>
          </li>
          <li>
            <Link href={'/community'}>게시판</Link>
          </li>
          <li>
            {loginState ? (
              <Link href={'/'} onClick={onClickLogOut}>
                로그아웃
              </Link>
            ) : (
              <Link href={'/login'}>로그인</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
