'use client';
import Button from '@/components/UI/Button';
import styles from './page.module.css';
import { use, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';
import { AccountContext } from '@/store/accountStore';
import clsx from 'clsx';
import SecondPassword from '@/components/SecondPassword';

export default function Remittance({ params }: any) {
  const { userInfo, loginState, secondPassword } = useContext(LoginContext);
  const { remit, account, updateAccount } = useContext(AccountContext);
  const router = useRouter();

  const [remitMoney, setRemitMoney] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    accountSelect: false,
    confirm: false,
    remitComplete: false,
    secondPassword: false,
  });
  const [user, setUser] = useState('');
  const [currentAccount, setCurrentAccount] = useState({
    accountNumber: '',
    balance: 0,
  });

  //사이드 이펙트
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;

      setUser(resolvedParams.user);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    const confirmLogin = () => {
      if (!loginState) {
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);
  useEffect(() => {
    if (user && account.length > 0) {
      // user와 account가 존재할 때만 실행
      const ac = account.find((ac) => ac.accountNumber === user);

      if (ac) {
        setCurrentAccount(ac); // ac가 존재할 때만 currentAccount 설정
      } else {
        console.warn('해당 계좌를 찾을 수 없습니다.');
      }
    }
  }, [user, account]);

  // 이벤트 핸들러
  const onClickModal = (
    modal: 'accountSelect' | 'confirm' | 'remitComplete'
  ) => {
    setVisibleModal({ ...visibleModal, [modal]: !visibleModal[modal] });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemitMoney(e.target.value);
  };

  const onChangeAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요');
      return;
    }

    if (+remitMoney < 0) {
      alert('0원 이상을 입력해주세요');
      return;
    }

    if (currentAccount.balance - +remitMoney < 0) {
      alert('잔액이 부족합니다');
      return;
    }

    setVisibleModal({ ...visibleModal, confirm: true });
  };

  const onCheck = () => {
    setVisibleModal({ ...visibleModal, confirm: false, secondPassword: true });
  };
  const onConfirm = () => {
    remit(accountNumber.trim(), +remitMoney);
    updateAccount({
      ...currentAccount,
      balance: currentAccount.balance - Number(remitMoney),
    });

    setVisibleModal({
      ...visibleModal,
      secondPassword: false,
      remitComplete: true,
    });
    setAccountNumber('');
    setRemitMoney('');
  };

  const onCloseSecondPw = () => {
    setVisibleModal({ ...visibleModal, secondPassword: false });
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.h2}>
        {userInfo.nickname}의 계좌 {currentAccount?.accountNumber}
        <p>잔액: {currentAccount.balance} 원</p>
      </h2>
      <div className={styles.container}>
        <h2>송금하기</h2>
        <p>송금 테스트 계좌: 12345678</p>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="송금할 계좌를 입력해주세요"
            onChange={onChangeAccountNumber}
            value={accountNumber}
          />
          <input
            type="number"
            className={clsx(styles.input, {
              [styles.invalidInput]:
                currentAccount.balance - Number(remitMoney) < 0,
            })}
            placeholder="금액을 입력해주세요"
            value={remitMoney}
            onChange={onChange}
          />
          <Button type="submit" styles={styles.button}>
            송금하기
          </Button>
        </form>
      </div>
      {visibleModal.confirm && (
        <div className={styles.modalBackground}>
          <div className={styles.submitModal}>
            <p>송금하려는 계좌번호와 금액을 확인해주세요</p>
            <p>계좌번호 : {accountNumber}</p>
            <p>송금 할 금액 : {remitMoney} (원)</p>
            <Button type="submit" onClickHandler={onCheck}>
              확인
            </Button>
            <Button
              type="button"
              onClickHandler={onClickModal.bind(null, 'confirm')}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
      {visibleModal.remitComplete && (
        <div className={styles.modalBackground}>
          <div className={styles.submitModal}>
            <h3>송금이 완료되었습니다</h3>
            <Button
              type="button"
              onClickHandler={onClickModal.bind(null, 'remitComplete')}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
      {visibleModal.secondPassword && (
        <>
          <div className={styles.closeModal}>닫기</div>
          <SecondPassword
            mode={secondPassword ? 'confirm' : 'set'}
            onClose={onCloseSecondPw}
            onConfirm={onConfirm}
          />
        </>
      )}
    </main>
  );
}
