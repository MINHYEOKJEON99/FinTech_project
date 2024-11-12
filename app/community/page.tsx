import PostListContainer from '@/components/Post/PostListContainer';
import styles from './page.module.css';

export default function Community() {
  return (
    <main className={styles.wrapper}>
      <PostListContainer />
    </main>
  );
}
