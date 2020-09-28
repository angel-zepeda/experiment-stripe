import axios from 'axios';
import { useState, MouseEvent } from 'react';

import styles from '../../../styles/Checkout.module.css';

export const Donation = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  }

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/payments/donations', { amount });
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div>
          <label htmlFor="amount" className={styles.label}>Amount: </label>
          <input
            id="amount"
            type="number"
            name="amount"
            min="10"
            className={styles.cardInput}
            placeholder="0.00"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit} className={styles.btnSubmit}>
            {
              isLoading ?
                `Donar ${amount && amount !== NaN ? amount : ''}`
                : null
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default Donation;