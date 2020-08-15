import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseProvider } from '../components/Context/FirebaseContext';
import { UserProvider } from '../components/Context/UserContext';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
