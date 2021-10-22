import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Cart} from './pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Cart} />
      </Switch>
    </Router>
  )
}

export default Routes;