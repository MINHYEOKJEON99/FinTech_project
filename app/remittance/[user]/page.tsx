import RemittanceForm from '@/components/FormComponent/RemittanceForm';
import styles from './page.module.css';

export default function Remittance() {
  return (
    <main className={styles.wrapper}>
      <RemittanceForm />
    </main>
  );
}
