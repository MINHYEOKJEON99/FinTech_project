'use client';

import { db } from '@/app/firebase';
import {
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from './loginStore';

interface postStoreProps {
  children: React.ReactNode; // children의 타입을 명시적으로 정의
}

interface postType {
  posts: {
    id: string;
    title: string;
    content: string;
    date: string;
    user: string;
  }[];
  addPost: (post: { title: string; content: string }) => void;
  deletePost: (id: string) => void;
}

export const PostContext = createContext<postType>({
  posts: [
    {
      id: '',
      title: '',
      content: '',
      date: '',
      user: '',
    },
  ],
  addPost: () => console.log('add'),
  deletePost: () => console.log('deletePost'),
});

const getCurrentTimeString = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default function PostStore({ children }: postStoreProps) {
  const { userInfo } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userInfoRef = ref(db, `post`);

    const unsubscribe = onValue(userInfoRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val()) || []); // 기존 계좌 정보 가져오기
      } else {
        console.log('No user data found');
      }
    });
    return () => unsubscribe();
  }, []);

  const addPost = async (post: { title: string; content: string }) => {
    const now = getCurrentTimeString();
    const lastPostIdRef = ref(db, 'lastPostId');
    const lastIdSnapshot = await get(lastPostIdRef);
    const lastId = lastIdSnapshot.exists() ? lastIdSnapshot.val() : 0;

    const newId = lastId + 1;
    await update(ref(db, `post`), {
      [newId]: {
        id: newId,
        title: post.title,
        content: post.content,
        date: now,
        user: userInfo.nickname,
      },
    });

    await set(lastPostIdRef, newId);
  };

  const deletePost = (id: string) => {
    remove(ref(db, `post/${id}`));
  };

  const postStore: postType = {
    posts,
    addPost,
    deletePost,
  };

  return (
    <PostContext.Provider value={postStore}>{children}</PostContext.Provider>
  );
}
