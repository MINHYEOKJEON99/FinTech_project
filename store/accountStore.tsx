'use client';

import { db } from '@/app/firebase';
import { get, ref, update } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from './loginStore';

interface LoginStoreProps {
  children: React.ReactNode; // children의 타입을 명시적으로 정의
}

interface stateType {
  account: {
    accountNumber: string;
    balance: number;
  }[];
  updateAccount: (updatedAccounts: {
    accountNumber: string;
    balance: number;
  }) => void;
}

export const AccountContext = createContext<stateType>({
  account: [
    {
      accountNumber: '',
      balance: 0,
    },
  ],
  updateAccount: () => console.log('update'),
});

export default function AccountStore({ children }: LoginStoreProps) {
  const { userKey } = useContext(LoginContext);
  const [account, setAccount] = useState([]);

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
  }, [userKey, account]);

  function updateAccount(updatedAccounts: {
    accountNumber: string;
    balance: number;
  }) {
    update(ref(db, `users/${userKey}`), {
      account: [...account, updatedAccounts],
    });
  }

  const accountStore: stateType = {
    account,
    updateAccount,
  };

  return (
    <AccountContext.Provider value={accountStore}>
      {children}
    </AccountContext.Provider>
  );
}
