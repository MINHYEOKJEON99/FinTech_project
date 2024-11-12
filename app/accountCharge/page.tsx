import AccountChargeForm from '@/components/FormComponent/AccountChargeForm';
import styles from './page.module.css';

export default function AccountRegister() {
  return (
    <main className={styles.wrapper}>
      <AccountChargeForm />
    </main>
  );
}
