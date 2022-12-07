import { useEffect, useState } from "react";


export const useWindowDimensions = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const handleWindowResize = () => {
    const { innerWidth, innerHeight } = window;

    setWidth(innerWidth);
    setHeight(innerHeight);
  }

  return {
    width,
    height,
  };
}