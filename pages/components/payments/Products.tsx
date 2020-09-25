import { useState, MouseEvent, useCallback, useEffect } from 'react';
import axios from 'axios';

import { ProductType, ProductsType } from '../../../interfaces/Product';
import styles from '../../../styles/Checkout.module.css';

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductsType[]>([]);
  const [product, setProduct] = useState<ProductType>({
    name: '',
  })

  const getProducts = useCallback(async () => {
    try {
      const { data: { products } } = await axios.get('/api/payments/product?limit=3');
      const productResponse = products as ProductsType[];
      console.log(productResponse)
      setProductList(productResponse);
    } catch (error) {
      console.error(error.message);
    }
  }, [])

  useEffect(() => {
    getProducts();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const createProduct = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/payments/product', { product });
      console.log(data);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message)
    }
  }

  const createSubscription = (priceId: string) => {
    console.log("", priceId)
  }

  const getPrice = async() => {
    const response = await axios.get('/api/payments/price_1HUyy6FPKxn5Y7HWFIyXPiem');
    console.log(response);
  }

  return (
    <div>
      <div style={{ padding: '5rem' }}>
        <h2>Crear producto</h2>
        <form className={styles.formContainer}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className={styles.cardInput}
          />
          <button
            onClick={createProduct}
            className={styles.btnSubmit}
          >
            {isLoading ? 'Cargando...' : 'Create product'}
          </button>
        </form>
        <h2>Product list</h2>
        {
          productList.map(productItem => (
            <div key={productItem.id} >
              <span>{productItem.name}</span>
              <button
                onClick={getPrice}
              >Suscribirse</button>
            </div>)
          )
        }
      </div>
    </div>
  );
};

export default Products;