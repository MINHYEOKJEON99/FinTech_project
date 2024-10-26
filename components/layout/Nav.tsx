import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.container}>
      <h2>
        <Link href={'/'}>FinTech</Link>
      </h2>
      <div className={styles.menu}>
        <ul className={styles.list}>
          <li>
            <Link href={'/community'}>게시판</Link>
          </li>
          <li>
            <Link href={'/login'}>로그인</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
