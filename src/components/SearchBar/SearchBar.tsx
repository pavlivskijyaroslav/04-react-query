import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { Field, Form, Formik, type FormikHelpers } from 'formik';

interface SearchBarProps {
  onSubmit: (search: string) => void;
}
function SearchBar({ onSubmit }: SearchBarProps) {
  interface SearcnFormValues {
    query: string;
  }
  const initialValues: SearcnFormValues = {
    query: '',
  };
  const handleSubmit = (
    values: SearcnFormValues,
    actions: FormikHelpers<SearcnFormValues>
  ) => {
    if (values.query === '') {
      toast.error('Please enter your search query.');
    } else {
      onSubmit(values.query);
    }
    actions.resetForm();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <Form>
            <Field
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
export default SearchBar;
