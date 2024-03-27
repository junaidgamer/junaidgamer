import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from '@auth0/auth0-react';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-moi10gmlwnekg74p.us.auth0.com"
    clientId="I1IHYYtZVVT0OqFZY6cR7AhMRaKQElnk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);


reportWebVitals();
