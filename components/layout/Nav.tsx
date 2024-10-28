'use client';

import Link from 'next/link';
import styles from './Nav.module.css';
import app from '@/app/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Nav() {
  const { data: session } = useSession();
  console.log(session);
  const auth = getAuth(app);
  const [loginState, setLoginState] = useState(false);
  const [socialLoginState, setSocialLoginState] = useState(false);

  useEffect(() => {
    const login = () => {
      if (session?.user) {
        setSocialLoginState(true);
      } else {
        setSocialLoginState(false);
      }
    };
    return () => {
      login();
    };
  });

  useEffect(() => {
    const login = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    });
    return () => {
      login();
    };
  }, []);

  const onClickLogOut = async () => {
    auth.signOut();
    await signOut({ redirect: true, callbackUrl: '/' });
    alert('로그아웃 되었습니다.');
  };

  return (
    <nav className={styles.container}>
      <h2>
        <Link href={'/'}>FinTech</Link>
      </h2>
      <div className={styles.menu}>
        <ul className={styles.list}>
          <li>
            <Link href={'/community'}>게시판</Link>
          </li>
          <li>
            {loginState || socialLoginState ? (
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
