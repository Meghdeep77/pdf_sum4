import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PolicyPage from "./pages/PolicyPage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Summ from "./pages/Summarizer";
import PrivateRoute from "./components/PrivateRoute";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PricingPage from "./pages/PricingPage";
import PaymentStatus from "./components/PaymentStatus";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-orange-100">
        <Switch>
          {/* Define the route and render Summarizer for the root path */}
          <PrivateRoute path="/" component={Summ} exact />
          <PrivateRoute path="/status" component={PaymentStatus} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/privacy" component={PolicyPage} exact />
          <Route path="/terms" component={TermsPage} exact />
          <Route path="/about" component={AboutPage} exact />
          <Route path="/contact" component={ContactPage} exact />
          <Route path="/pricing" component={PricingPage} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
