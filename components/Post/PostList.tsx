'use client';

import { useRouter } from 'next/navigation';
import styles from './PostList.module.css';

interface propsType {
  id: string;
  title: string;
  date: string;
  user: string;
}

export default function PostList({ id, title, date, user }: propsType) {
  const router = useRouter();

  const onClickPost = () => {
    router.push(`/community/${id}`);
  };
  return (
    <div className={styles.postContainer} onClick={onClickPost}>
      <div className={styles.post}>
        <p>{title}</p>
        <div className={styles.row}>
          <p className={styles.user}>{user}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </div>
  );
}
