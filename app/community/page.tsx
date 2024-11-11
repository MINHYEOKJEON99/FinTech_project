'use client';

import PostList from '@/components/Post/PostList';
import styles from './page.module.css';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '@/store/loginStore';
import { PostContext } from '@/store/postStore';

export default function Community() {
  const router = useRouter();
  const { loginState } = useContext(LoginContext);
  const { posts } = useContext(PostContext);
  const [pagenation, setPagenation] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // 현재 페이지에 해당하는 포스트를 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    setPagenation(arr);
  }, [totalPages]);

  const onClickNewPost = () => {
    router.push('/community/newpost');
  };

  const onClickPage = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h2>게시판</h2>
        {loginState ? (
          <Button type="button" onClickHandler={onClickNewPost}>
            글쓰기
          </Button>
        ) : (
          ''
        )}
      </div>

      {posts.length ? (
        posts
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((post) => (
            <PostList
              key={post.date}
              id={post.id}
              title={post.title}
              date={post.date}
              user={post.user}
            />
          ))
      ) : (
        <p style={{ marginTop: '24px' }}>게시글이 없습니다.</p>
      )}
      <ul className={styles.pagenation}>
        {pagenation.map((num) => (
          <li key={num} onClick={onClickPage.bind(null, num)}>
            {num}
          </li>
        ))}
      </ul>
    </main>
  );
}
