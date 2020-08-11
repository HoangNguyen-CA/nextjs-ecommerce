import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContext from '../components/CartContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <CartContext.Provider value={{ cart: [] }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  );
}

export default MyApp;
