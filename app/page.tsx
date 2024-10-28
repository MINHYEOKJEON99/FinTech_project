import { auth } from '@/auth';
import styles from './page.module.css';
import Button from '@/components/UI/Button';

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.firstBox}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              간편한 금융 서비스를<p>이용하세요</p>
            </h2>
            <Button type="button" path="/login">
              이용하기
            </Button>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
