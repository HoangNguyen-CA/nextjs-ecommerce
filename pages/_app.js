import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from '../components/Context/CartContext';
import { FirebaseProvider } from '../components/Context/FirebaseContext';
import { UserProvider } from '../components/Context/UserContext';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <UserProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </UserProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
