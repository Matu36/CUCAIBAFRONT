import { createContext, useState } from "react";
import SpinnerNuevo from "../components/UI/SpinnerNuevo";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (value) => setIsLoading(value);

  const data = { toggleLoading };

  return (
    <LoadingContext.Provider value={data}>
      {isLoading && <SpinnerNuevo />}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider };
export default LoadingContext;
