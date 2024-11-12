'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginContext } from '@/store/loginStore';
import app from '@/app/firebase';

export default function LoginForm() {
  // prettier-ignore
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const { loginState } = useContext(LoginContext);
  const auth = getAuth(app);

  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  //로그인 상태시 메인페이지로 이동
  useEffect(() => {
    const confirmLogin = () => {
      if (loginState) {
        router.push('/');
      } else {
        router.push('/login');
      }
    };

    confirmLogin();
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
      router.push('/');
    } catch (e) {
      console.log(e);
      alert('비밀번호와 이메일을 확인해주세요');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onClickSignUp = () => {
    router.push('/signup');
  };

  const onNaverLogin = async () => {
    await signIn('naver', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
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
        <Button
          type="button"
          onClickHandler={onClickSignUp}
          styles={styles.signupButton}
        >
          회원가입
        </Button>
        <button
          type="button"
          className={styles.naver}
          onClick={onNaverLogin}
        ></button>
      </div>
      <div className={styles.img}></div>
    </form>
  );
}
