import { useState } from 'react';

import Donation from '../components/payments/Donation';
import Subscription from '../components/payments/Subscription';
import Customer from '../components/payments/Customer';
import Products from '../components/payments/Products';
import Plan from '../components/payments/Plan';
import CustomCardElements from '../components/payments/CustomCardElements';

const PaymentType = ({ page }: { page: number }) => {
  if (page === 0) return <Subscription />
  if (page === 1) return <Donation />
  if (page === 2) return <Customer />
  if (page === 3) return <Products />
  if (page === 4) return <Plan />
  if (page === 5) return <CustomCardElements />
}

const PaymentsPage = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setPage(0)}>Subscriptions</button>
      <button onClick={() => setPage(1)}>Donate</button>
      <button onClick={() => setPage(2)}>Customer</button>
      <button onClick={() => setPage(3)}>Products</button>
      <button onClick={() => setPage(4)}>Plan</button>
      <button onClick={() => setPage(5)}>Custom card</button>
      <PaymentType page={page} />
    </div>
  );
};

export default PaymentsPage;