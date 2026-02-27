import { useState } from "react";

export function ConditionalHookComponent({ condition }: { condition: boolean }) {
  if (condition) {
    const [value, setValue] = useState(0);
    return <div onClick={() => setValue(value + 1)}>{value}</div>;
  }

  return <div>No value</div>;
}
