import NewPostForm from '@/components/FormComponent/NewPostForm';
import styles from './page.module.css';
export default function NewPost() {
  return (
    <main className={styles.wrapper}>
      <NewPostForm />
    </main>
  );
}
