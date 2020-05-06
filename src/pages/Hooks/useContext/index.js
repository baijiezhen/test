import React, { useContext } from "react";
const colorContext = React.createContext("gray");
function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}
function Foo() {
  return <Bar />;
}
function BarTo() {
  return (
    <colorContext.Provider value={"red"}>
      <Foo />
    </colorContext.Provider>
  );
}
export default BarTo;
