import ExpenseForm from '@/components/FormComponent/ExpenseForm';
import styles from './page.module.css';

export default function ExpenseDetails() {
  return (
    <main className={styles.wrapper}>
      <ExpenseForm />
    </main>
  );
}
