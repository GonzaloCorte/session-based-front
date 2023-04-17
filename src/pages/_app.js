import { Container, Row, Col } from 'react-bootstrap'
import Login from './UserLogin'
import Register from './UserRegister'
import { Switch, Route } from 'react-router-dom';
import FreeComponent from './FreeComponent';
import AuthComponent from './AuthComponent';
import ProtectedRoutes from './ProtectedRoutes';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/globals.css';

import { userService } from '@/services';
import { Nav, Alert } from '@/components';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
  }
  }, []);

  function authCheck(url) {
    setToken(userService.tokenValue);
    console.log(token);
    const publicPaths = ['/account/login', '/account/register', '/account/error'];
    const path = url.split('?')[0];

    if (!userService.tokenValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (

    <>
      <Head>
        <title>
          Welcome wanderer to my web site
        </title>
        {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
      </Head>

      <div className={`app-container ${token ? 'bg-light' : ''}`}>
        <Nav />
        <Alert />
        {authorized &&
            <Component {...pageProps} />
        }
      </div>
    </>

    

    // <Container>
    //   <Switch>
    //     <Route exact path="/register" component={Register}/>
    //     <Route exact path="/login" component={Login}/>
    //     <Route exact path="/free" component={FreeComponent}/>
    //     <ProtectedRoutes path="/auth" component={AuthComponent}/>
    //   </Switch>
    // </Container>
    // <Route exact path='="/auth' component={AuthComponent}/>
    // <Container>
    //   <Row>
    //     <Col xs={12} sm={12} md={6} lg={6}>
    //       <Register />
    //     </Col>

    //     <Col xs={12} sm={12} md={6} lg={6}>
    //       <Login/>
    //     </Col>
    //   </Row>
    // </Container>
  )
}
