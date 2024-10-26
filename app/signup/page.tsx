'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/UI/Button';
import clsx from 'clsx';
export default function SignUp() {
  // prettier-ignore
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    birth: '',
  });

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regEmail.test(userInfo.email)) {
      alert('이메일 형식을 지켜주세요');
      return;
    }

    if (Object.values(userInfo).some((value) => value.trim() === '')) {
      alert('모든 내용을 작성해주세요');
      return;
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    console.log(userInfo);
  };

  const { email, password, nickname, birth, confirmPassword } = userInfo;

  return (
    <main className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.container}>
        <h1>회원가입</h1>
        <p>sign up for our service</p>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={onChangeValue}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangeValue}
        />
        <input
          className={clsx(styles.input, {
            [styles.inValidInput]:
              userInfo.password !== userInfo.confirmPassword,
          })}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={onChangeValue}
        />
        <input
          className={styles.input}
          type="text"
          name="nickname"
          placeholder="nickname"
          value={nickname}
          onChange={onChangeValue}
        />
        <input
          className={styles.input}
          type="text"
          name="birth"
          placeholder="birth(0000-00-00)"
          value={birth}
          onChange={onChangeValue}
        />
        <Button type="submit" styles={styles.button}>
          회원가입
        </Button>
      </form>
    </main>
  );
}
