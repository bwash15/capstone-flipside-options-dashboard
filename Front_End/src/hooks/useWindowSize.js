import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  // Only runs on Load up > One time
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    // This prevents a memeory leak that happens by using he EventListener
    return () => window.removeEventListener("resize", handleResize);

  }, [])

  return windowSize;
}


export default useWindowSize;