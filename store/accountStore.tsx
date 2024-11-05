'use client';

import { db } from '@/app/firebase';
import { get, ref, set, update } from 'firebase/database';
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
  addAccount: (updatedAccounts: {
    accountNumber: string;
    balance: number;
  }) => void;
  remit: (remitAccount: string, remitMoney: number) => void;
}

type Account = {
  accountNumber: string;
  balance: number;
  // Add other properties here if needed
};

type User = {
  birth: string; // e.g., "1999-12-08"
  nickname: string; // e.g., "전민혁"
  account: Account[]; // Array of account objects
};

type Users = {
  [userId: string]: User;
};

export const AccountContext = createContext<stateType>({
  account: [],
  updateAccount: () => console.log('update'),
  addAccount: () => console.log('add'),
  remit: () => console.log('remit'),
});

export default function AccountStore({ children }: LoginStoreProps) {
  const { userKey, userInfo } = useContext(LoginContext);
  const [account, setAccount] = useState<Account[]>([]);
  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    const fetchAccounts = async () => {
      if (userKey && userInfo.account) {
        setAccount(userInfo.account);
      }
    };

    fetchAccounts();
  }, [userKey, userInfo]);

  useEffect(() => {
    const fetchUser = async () => {
      const usersRef = ref(db, `users`);
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        setUsers(snapshot.val() || []); // 기존 계좌 정보 가져오기
      } else {
        console.log('No account data found');
      }
    };

    fetchUser();
  }, [account]);

  function addAccount(updatedAccounts: {
    accountNumber: string;
    balance: number;
  }) {
    if (account) {
      update(ref(db, `users/${userKey}`), {
        account: [...account, updatedAccounts],
      });
    } else {
      set(ref(db, `users/${userKey}`), {
        account: [updatedAccounts],
      });
    }
  }

  function updateAccount(updatedAccount: {
    accountNumber: string;
    balance: number;
  }) {
    const updatedAccountList = account.map(
      (acc: { accountNumber: string; balance: number }) =>
        acc.accountNumber === updatedAccount.accountNumber
          ? { ...acc, balance: updatedAccount.balance } // 기존 accountNumber가 같다면 balance만 업데이트
          : acc
    );

    update(ref(db, `users/${userKey}`), {
      account: updatedAccountList,
    });
  }

  function remit(remitAccount: string, remitMoney: number) {
    const arr = Object.keys(users);
    let remittance = {
      remitUserkey: '',
      accountNumber: '',
      balance: 0,
    };
    //Objects.values를 이용하여 배열로 반환
    for (let i = 0; i < arr.length; i++) {
      const userId = arr[i];
      const userAccounts = users[userId].account
        ? Object.values(users[userId].account)
        : []; // 현재 사용자의 계좌 배열
      console.log(userAccounts);
      // 현재 사용자 계좌 배열에서 remitAccount와 일치하는 계좌가 있는지 확인
      const matchingAccount = userAccounts.find(
        (account) => account.accountNumber === remitAccount
      );

      if (matchingAccount) {
        // 일치하는 계좌를 찾으면 remittance에 값 설정
        remittance.remitUserkey = userId;
        remittance.accountNumber = matchingAccount.accountNumber;
        remittance.balance = matchingAccount.balance;
        break; // 일치하는 계좌를 찾았으므로 반복 종료
      }
    }

    if (remittance.remitUserkey) {
      update(ref(db, `users/${remittance.remitUserkey}`), {
        account: {
          accountNumber: remittance.accountNumber,
          balance: remittance.balance + remitMoney,
        },
      });
    }
  }

  const accountStore: stateType = {
    account,
    updateAccount,
    addAccount,
    remit,
  };

  return (
    <AccountContext.Provider value={accountStore}>
      {children}
    </AccountContext.Provider>
  );
}
