import React, {createContext, useState} from 'react';

const CabContext = createContext();

const CabProvider = ({children}) => {
  const [bookedCabs, setBookedCabs] = useState([]);

  return (
    <CabContext.Provider value={{bookedCabs, setBookedCabs}}>
      {children}
    </CabContext.Provider>
  );
};

export {CabContext, CabProvider};
