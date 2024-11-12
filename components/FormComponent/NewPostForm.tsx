'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './NewPostForm.module.css';
import { LoginContext } from '@/store/loginStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import { PostContext } from '@/store/postStore';

export default function NewPostForm() {
  const router = useRouter();
  const { loginState } = useContext(LoginContext);
  const { addPost } = useContext(PostContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const confirmLogin = () => {
      if (!loginState) {
        alert('로그인이 필요합니다');
        router.push('/login');
      }
    };

    confirmLogin();
  }, []);

  const onChangeValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.title.trim() === '' || post.content.trim() === '') {
      return;
    }

    try {
      addPost(post);
      alert('게시글이 작성 되었습니다');
      router.push('/community');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2>글 쓰기</h2>
          <Button type="submit">작성하기</Button>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="제목"
            value={post.title}
            onChange={onChangeValue}
            name="title"
          />
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력 해주세요"
            name="content"
            onChange={onChangeValue}
            value={post.content}
          ></textarea>
        </div>
      </form>
    </>
  );
}
