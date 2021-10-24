import './App.css';
import Create from '../interface-vendors/create/create';
import Read from '../interface-vendors/read/read';
import CreateProduct from './../interface-products/create/create';
import ReadProduct from './../interface-products/read/read';
import Update from '../update/update';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../Navbar';


function App() {
  return (
    
    <Router>
      <Navbar/>
      <Switch>
      <div className="main">
        <div className="target">
          <h2 className="main-header">Organic Fashion Company<br></br></h2>
          <div>
            <Route exact path='/registrar-vendedor' component={Create} />
            <Route exact path='/registrar-producto' component={CreateProduct} />
          </div>
          <div style={{ marginTop:20 }}>
            <Route exact path='/vendedores' component={Read} />
            <Route exact path='/productos' component={ReadProduct} />
          </div>
          <Route path='/actualizar-info-vendedor/:id?' component={Create} />
          <Route path='/actualizar-info-product/:id?' component={CreateProduct} />
          <Route exact path='/update/:id?' component={Update} />
        </div>
      </div>
      </Switch>
    </Router>
  );
}

export default App;
