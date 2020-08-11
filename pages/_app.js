import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContext from '../components/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartContext.Provider value={{ cart: [] }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
