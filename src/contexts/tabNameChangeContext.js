import { createContext, useState } from "react";

export const TabNameChangeContext = createContext({
  data: null,
  setData: () => null,
});

export const TabNameChangeContextProvider = ({ children }) => {
  const [tabName, setTabName] = useState(null);
  const value = { tabName, setTabName };
  return (
    <TabNameChangeContext.Provider value={value}>
      {children}
    </TabNameChangeContext.Provider>
  );
};
