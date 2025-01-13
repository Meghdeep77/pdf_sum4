import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pdf_upload from "./components/Pdf_upload";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Summ from "./Summarizer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-orange-100">
        <Switch>
          {/* Define the route and render Summarizer for the root path */}
          <PrivateRoute path="/" component={Summ} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Registration} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
