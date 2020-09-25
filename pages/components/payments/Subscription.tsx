import { MouseEvent } from "react";

import { createSubscription } from '../../../utils/stripe';

const Subscription = () => {
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    createSubscription('price_1HVK4gFPKxn5Y7HWot2KU2rA');
  };

  return (
    <div>
      <h2>Subscripcion with checkout</h2>
      <button onClick={handleSubmit}>Redirect checkout</button>
    </div>
  );
};

export default Subscription;