import React from "react";
import Fade from "@mui/material/Fade";

interface DeferProps {
  children: React.ReactNode;
  timeout?: number;
}

export default function Defer({ children, timeout = 300 }: DeferProps) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fade in={show}>
      <div>{children}</div>
    </Fade>
  );
}
