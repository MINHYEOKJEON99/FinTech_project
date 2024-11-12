'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './PostDetail.module.css';
import Button from '@/components/UI/Button';
import { PostContext } from '@/store/postStore';
import { useParams, useRouter } from 'next/navigation';
import { LoginContext } from '@/store/loginStore';

export default function PostDetail() {
  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    date: '',
    user: '',
  });
  const { posts, deletePost } = useContext(PostContext);
  const { userInfo } = useContext(LoginContext);
  const { postDetail } = useParams();
  const router = useRouter();

  useEffect(() => {
    const confirm = () => {
      if (posts.length === 0) {
        router.push('/community');
      }
    };
    confirm();
  }, []);

  useEffect(() => {
    function fetchParams() {
      if (posts.length > 0) {
        // posts가 비어 있지 않을 때만 실행
        setPost(
          posts.find((el) => String(el.id) === postDetail) ?? {
            id: '',
            title: '',
            content: '',
            date: '',
            user: '',
          }
        );
      }
    }
    fetchParams();
  }, [posts, postDetail]);

  const onClickDelete = (id: string) => {
    try {
      deletePost(id);
      alert('삭제 되었습니다.');
      if (posts.length === 1) {
        location.reload();
      } else {
        router.push('/community');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>게시판</h2>
        {userInfo.nickname === post.user && (
          <Button
            type="button"
            onClickHandler={onClickDelete.bind(null, String(postDetail))}
          >
            삭제
          </Button>
        )}
      </div>
      {post && (
        <div className={styles.Container}>
          <div className={styles.postHeader}>
            <p className={styles.title}>제목: {post.title}</p>
            <p className={styles.user}>{post.user}</p>
          </div>
          <div className={styles.content}>{post.content}</div>
        </div>
      )}
    </div>
  );
}
