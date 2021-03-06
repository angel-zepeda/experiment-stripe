import { useState, MouseEvent } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElements, Stripe } from '@stripe/stripe-js';

import styles from '../../../styles/Checkout.module.css';

const ELEMENT_OPTIONS = {
  showIcons: true,
  style: {
    base: {
      fontSize: '18px',
      color: '#263238',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#f44336'
    }
  }
};

const CardElements = () => {
  const elements: StripeElements = useElements();
  const stripe: Stripe = useStripe();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const striperErrors: { [key: string]: string } = {
    invalid_request_error: 'Petición invalida',
    invalid_number: 'El número de tarjeta es invalido',
  }

  const handleSubmit = async (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (cardElement) {
      const payload = await stripe.createToken(cardElement);
      setIsLoading(false);
      if (payload) {
        if (payload.error) {
          console.log(payload.error);
          if (payload.error.type) {
            setError(striperErrors[payload.error.type]);
          }
          setError(payload.error.message);
        }
        if (payload.token.id) {
          setError('')
          setPaymentToken(payload.token.id);
        }
      }
    }
  };

  return (
    <div style={{padding: '5rem'}}>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="card-owner" className={styles.label}>
            Nombre:
          </label>
          <input
            type="text"
            placeholder="Jhon Doe"
            className={styles.cardInput}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="card-number" className={styles.label}>
            Número de la tarjeta:
          </label>
          <CardNumberElement
            options={ELEMENT_OPTIONS}
            className={styles.cardInput}
          />
        </div>

        <div className={styles.expiryContainer}>
          <CardExpiryElement
            options={ELEMENT_OPTIONS}
            className={styles.expiryInput}
          />
          <CardCvcElement
            options={ELEMENT_OPTIONS}
            className={styles.cvcInput}
          />
        </div>

        {error && <span className={styles.error}>{error}</span>}
        <button
          onClick={handleSubmit}
          className={styles.btnSubmit}
        >
          {isLoading ? 'Cargando...' : 'Pagar $10'}
        </button>
      </form>
      {
        paymentToken &&
        <div style={{ marginTop: '1rem' }}>
          Se procesó correctamente tu tarjeta, token_id: <br /> <span style={{ color: '#43a047' }}>{paymentToken}</span>
        </div>
      }
    </div>
  );
};

const stripePromise = loadStripe('pk_test_i0VJrkb1Dseh0fTIu903sis7001a5I25Vd');

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardElements />
    </Elements>
  );
};

export default Checkout;
