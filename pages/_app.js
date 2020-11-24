import '../styles/all.scss';
import Layout from '../layouts/DefaultLayout';

function MyApp({ Component, pageProps }) {

  const MainLayout = Component.layout || Layout

  return(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp
