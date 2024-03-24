import React from "react";

import Fade from "@mui/material/Fade";

interface DeferredViewProps extends React.HTMLAttributes<HTMLDivElement> {
  loaded: boolean;
  timeout?: number;
}

export default function DeferredView({ loaded, timeout = 500, children, ...props }: DeferredViewProps) {
  const [timeover, setTimeover] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeover(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={loaded || timeover}>
      <div {...props}> {children}</div>
    </Fade>
  );
}
