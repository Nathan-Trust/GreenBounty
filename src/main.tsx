import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import ProvidersClient from "./provider/client.tsx";
import {  HelmetProvider } from 'react-helmet-async';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProvidersClient>
        <RouterProvider router={router} />
      </ProvidersClient>
    </HelmetProvider>
  </React.StrictMode>
);
