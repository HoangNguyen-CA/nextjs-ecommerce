import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseProvider } from '../components/Context/FirebaseContext';
import { UserProvider } from '../components/Context/UserContext';
import { OrdersProvider } from '../components/Context/OrdersContext';
import { CartProvider } from '../components/Context/CartContext';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <OrdersProvider>
        <CartProvider>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </CartProvider>
      </OrdersProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
