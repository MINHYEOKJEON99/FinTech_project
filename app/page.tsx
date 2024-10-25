import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.firstBox}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              간편한 금융 서비스를<p>이용하세요</p>
            </h2>
            <button className={styles.button}>이용하기</button>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
