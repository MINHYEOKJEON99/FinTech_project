import styles from './page.module.css';
import Button from '@/components/UI/Button';
import Balance from '@/components/Balance';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.firstBox}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              간편한 금융 서비스를<p>이용하세요</p>
            </h2>
            <Link href={'/login'}>
              <Button type="button">이용하기</Button>
            </Link>
          </div>
          <div></div>
        </div>
        <div>
          <div className={styles.balanceWrapper}>
            <h2>잔고</h2>
            <div className={styles.balanceContainer}>
              <Balance />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
