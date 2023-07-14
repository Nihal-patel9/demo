import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <div className="button-container">
            <button className="buy-now-button">Buy Now</button>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
