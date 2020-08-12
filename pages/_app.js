import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from '../components/Context/CartContext';
import { FirebaseProvider } from '../components/Context/FirebaseContext';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
