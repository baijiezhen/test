import React, { useState } from "react";
function Test() {
  const [obj, setObject] = useState({
    count: 0,
    name: "alife",
  });
  return (
    <div className="App">
      Count: {obj.count}
      <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>
        +
      </button>
      <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>
        -
      </button>
    </div>
  );
}
export default Test;
