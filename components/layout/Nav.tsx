import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.container}>
      <h2>FinTech</h2>
      <div className={styles.menu}>
        <ul className={styles.list}>
          <li>게시판</li>
          <li>로그인</li>
        </ul>
      </div>
    </nav>
  );
}
