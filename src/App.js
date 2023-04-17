import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchComponent from "./search-component";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchComponent />
    </QueryClientProvider>
  );
}

export default App;
