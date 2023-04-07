import { Container, Row, Col } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'
import { Switch, Route } from 'react-router-dom';
import FreeComponent from './FreeComponent';
import AuthComponent from './AuthComponent';
import ProtectedRoutes from './ProtectedRoutes';
import Link from 'next/link';

export default function App() {
  return (

    <Link to="/login"></Link>

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
