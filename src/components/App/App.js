import './App.css';
import Create from '../interface-vendors/create/create';
import Read from '../interface-vendors/read/read';
import CreateProduct from './../interface-products/create/create';
import ReadProduct from './../interface-products/read/read';
import Update from '../update/update';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../Navbar';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import { getToken } from '../../utils/getToken';
import LoginUser from '../interface-login/login';
import CreateUser from '../interface-users/create/create';
import ReadUser from '../interface-users/read/read';
import CreateVentas from '../interface-ventas/create/create';
import ReadVentas from '../interface-ventas/read/read';

function App() {
  const token = getToken();
  return (
    <Router>
    {token ? <> <Navbar/> </> : null}
      <Switch>
      <div className="main">
        <div className="target">
          <div>
          <Route exact path='/' component={LoginUser} />
            <Route exact path='/registrar-vendedor' component={Create} />
            <Route exact path='/registrar-producto' component={CreateProduct} />
            <Route exact path='/registrar-usuario' component={CreateUser} />
            <Route exact path='/registrar-venta' component={CreateVentas} />
          </div>
          <div style={{ marginTop:20 }}>
          <Route exact path='/vendedores' component={Read} />
            <Route exact path='/productos' component={ReadProduct} />
            <Route exact path='/usuarios' component={ReadUser} />
            <Route exact path='/ventas' component={ReadVentas} />
          </div>
          <Route path='/actualizar-info-vendedor/:id?' component={Create} />
          <Route path='/actualizar-info-product/:id?' component={CreateProduct} />
          <Route path='/actualizar-info-usuario/:id?' component={CreateUser} />
          <Route path='/actualizar-info-venta/:id?' component={CreateVentas} />
          <Route exact path='/update/:id?' component={Update} />
        </div>
      </div>
      </Switch>
    </Router>
  );
}

export default App;
