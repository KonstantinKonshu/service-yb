import React from "react";

import { ProviderStore } from "./store";
import RouterApp from "./routes/router_app";

const App = () => {
  return (
    <ProviderStore>
      <RouterApp />
    </ProviderStore>
  );
};

export default App;
