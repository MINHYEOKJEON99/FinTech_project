import LoginForm from '@/components/FormComponent/LoginForm';
import styles from './page.module.css';

export default function Login() {
  return (
    <main className={styles.wrapper}>
      <LoginForm />
    </main>
  );
}
