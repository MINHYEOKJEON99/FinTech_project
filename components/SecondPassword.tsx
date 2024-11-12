'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './SecondPassword.module.css';
import { LoginContext } from '@/store/loginStore';
import { HmacSHA256 } from 'crypto-js';

//prettier-ignore
const BUTTON_ARR = [  '1', '2', '3', '4', '5', '6', '7', '8', '9', '' ,'0', '지우기']
const KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export default function SecondPassword({
  mode,
  onClose,
  onConfirm,
}: {
  mode: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [password, setPassword] = useState('');
  const { addSecondPassword, secondPassword } = useContext(LoginContext);

  const onClickButton = (value: string) => {
    if (value === '지우기') {
      const deletePw = [...password].slice(0, password.length - 1).join('');
      setPassword(deletePw);
    } else {
      setPassword((prev) => prev + value);
    }
  };

  useEffect(() => {
    async function passwordConfirm() {
      if (password.length === 6 && mode === 'set') {
        try {
          await setPassword('');

          if (KEY) {
            await addSecondPassword(HmacSHA256(password, KEY).toString());
          } else {
            console.error('Secret key is undefined.');
          }

          await onClose();
          alert('비밀번호 설정이 완료되었습니다.');
        } catch (e) {
          console.log(e);
        }
      } else if (password.length === 6 && mode === 'confirm') {
        try {
          if (KEY && secondPassword === HmacSHA256(password, KEY).toString()) {
            alert('2차 비밀번호 인증 완료');
            await onConfirm();
          } else if (
            KEY &&
            secondPassword !== HmacSHA256(password, KEY).toString()
          ) {
            alert('2차 비밀번호가 틀렸습니다.');
            setPassword('');
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    passwordConfirm();
  }, [password]);

  const content = <div className={styles.circle}></div>;
  const title =
    mode === 'confirm'
      ? '2차 비밀번호를 입력하세요.'
      : '2차 비밀번호를 설정해주세요.';

  return (
    <div className={styles.modalBackground}>
      <div className={styles.submitModal}>
        <div className={styles.closeModal} onClick={onClose}>
          닫기
        </div>
        <div className={styles.passwordContainer}>
          <p>{title}</p>
          <ul className={styles.password}>
            <li>
              <div className={styles.pw}>{password[0] ? content : ''}</div>
            </li>
            <li>
              <div className={styles.pw}>{password[1] ? content : ''}</div>
            </li>
            <li>
              <div className={styles.pw}>{password[2] ? content : ''}</div>
            </li>
            <li>
              <div className={styles.pw}>{password[3] ? content : ''}</div>
            </li>
            <li>
              <div className={styles.pw}>{password[4] ? content : ''}</div>
            </li>
            <li>
              <div className={styles.pw}>{password[5] ? content : ''}</div>
            </li>
          </ul>
        </div>
        <ul className={styles.buttonContainer}>
          {BUTTON_ARR.map((el) => (
            <li key={el}>
              <button onClick={onClickButton.bind(null, el)}>{el}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
