import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ForgotPassScreen from "./components/screens/ForgotPassScreen";
import LoginScreen from "./components/screens/LoginScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ResetPassScreen from "./components/screens/ResetPassScreen";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/private" component={PrivateScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpass" component={ForgotPassScreen} />
        <Route
          exact
          path="/api/v1/auth/resetpass/:resetToken"
          component={ResetPassScreen}
        />
      </Switch>
    </Router>
  );
};

export default App;
