import Checkout from './components/Checkout';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Checkout />
    </div>
  );
};

export default HomePage;
