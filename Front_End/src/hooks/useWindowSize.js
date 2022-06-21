import { useState, useEffect } from "react";

const useWindowSizes = () => {
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

function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() =>{
      const handleResize = () =>{
        setSize([window.innerHeight, window.innerWidth]);
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener("resize", handleResize);
    },[]);
    return size;
  }

export default useWindowSize;