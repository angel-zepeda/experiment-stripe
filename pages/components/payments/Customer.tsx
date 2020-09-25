import axios from 'axios';
import { MouseEvent, useState, useEffect, useCallback } from "react";
import { CustomersType, CustomerType } from '../../../interfaces/Customer';

import styles from '../../../styles/Checkout.module.css';

const Customer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customersList, setCustomersList] = useState<CustomersType[]>([]);
  const [customer, setCustomer] = useState<CustomerType>({
    name: '',
    email: ''
  });

  const getCustomers = useCallback(async () => {
    try {
      const { data: { customers } } = await axios.get('/api/payments/customer?limit=3');
      const customerResponse = customers as CustomersType[];
      setCustomersList(customerResponse);
    } catch (error) {
      console.error(error.message);
    }
  }, [])

  useEffect(() => {
    getCustomers();
  }, [])

  const createCustomer = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/payments/customer', { customer });
      setIsLoading(false);
      getCustomers();
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div style={{ padding: '5rem' }}>
        <form className={styles.formContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className={styles.cardInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={styles.cardInput}
          />
          <button
            onClick={createCustomer}
            className={styles.btnSubmit}
          >
            {isLoading ? 'Cargando...' : 'Create customer'}
          </button>
        </form>
        <h3>Customer list</h3>
        {
          customersList.map(customerItem => (
            <div key={customerItem.id}>
              <p>{customerItem.name} - {customerItem.email}</p>
            </div>)
          )
        }
      </div>
    </div>

  );
};

export default Customer;