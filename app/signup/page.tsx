import SignUpForm from '@/components/FormComponent/SignUpForm';
import styles from './page.module.css';

export default function SignUp() {
  return (
    <main className={styles.wrapper}>
      <SignUpForm />
    </main>
  );
}
