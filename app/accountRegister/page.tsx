import AccountRegisterForm from '@/components/FormComponent/AccountRegisterForm';
import styles from './page.module.css';

export default function AccountRegister() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>계좌 등록</h2>
        <AccountRegisterForm />
      </div>
    </main>
  );
}
