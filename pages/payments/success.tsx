import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await axios.get(`/api/payments/sessions?sessionId=${session_id}`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    getSession();
  }, [session_id])

  return (
    <div>
      <h1>Pagina de pago exitoso</h1>
    </div>
  )
}

export default SuccessPage;