'use client';
import { useEffect, useState } from 'react';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import app from '../firebase';

import Button from '@/components/UI/Button';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  // prettier-ignore
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const auth = getAuth(app);

  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  //로그인 상태시 메인페이지로 이동
  useEffect(() => {
    const loginState = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      } else {
        router.push('/login');
      }
    });
    return () => {
      loginState();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regEmail.test(loginInfo.email)) {
      alert('이메일 형식을 확인해주세요');
      return;
    }
    if (loginInfo.email.trim() === '' || loginInfo.password.trim() === '') {
      alert('이메일과 비밀번호를 작성해주세요');
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      console.log('로그인 성공 ');
    } catch (e) {
      console.log(e);
      alert('비밀번호와 이메일을 확인해주세요');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.container}>
        <div className={styles.loginForm}>
          <h2>로그인</h2>
          <p>login for our service</p>
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            name="email"
            value={loginInfo.email}
            onChange={onChange}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            name="password"
            value={loginInfo.password}
            onChange={onChange}
          />
          <Button type="submit">로그인</Button>
          <Button type="button" path="/signup" styles={styles.signupButton}>
            회원가입
          </Button>
        </div>
        <div className={styles.img}></div>
      </form>
    </main>
  );
}
