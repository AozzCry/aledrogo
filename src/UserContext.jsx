import React, { createContext, useState } from "react";

const UserContext = createContext({
  name: "",
  setName: () => {},
  email: "",
  setEmail: () => {},
  cart: [{ product: null, count: 0 }],
  setCart: () => {},
});

export const UserContextProvider = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cart, setCart] = useState([]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        cart,
        setCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
