import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router.js";

// RDX TKT
import { store } from "./config/store";
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./utils/constant.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
