import PaymentForm from '@/components/FormComponent/PaymentForm';
import styles from './page.module.css';

export default function Payment() {
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.h2}>결제하기</h2>
      <PaymentForm />
    </main>
  );
}
