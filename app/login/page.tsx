'use client';
import Button from '@/components/UI/Button';
import styles from './page.module.css';
import { useState } from 'react';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // prettier-ignore
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regEmail.test(loginInfo.email)) {
      alert('이메일 형식을 확인해주세요');
      return;
    }
    if (loginInfo.email.trim() === '' || loginInfo.password.trim() === '') {
      alert('이메일과 비밀번호를 작성해주세요');
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
