import { createContext, useState } from "react";

//@ts-ignore
const UserType = createContext({});

//@ts-ignore
const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };