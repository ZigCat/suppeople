import '../styles/all.scss';
import Layout from '../layouts/DefaultLayout';

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
