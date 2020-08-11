import Head from 'next/head';
import Layout from '../components/Layout';
import { Button } from 'reactstrap';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Ecommerce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Button>Hello</Button>
    </Layout>
  );
}
