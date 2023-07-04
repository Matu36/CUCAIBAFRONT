import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import { Provider } from "react-redux";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

import { store } from "./Redux/Store/index";
import router from "./utils/routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
);
