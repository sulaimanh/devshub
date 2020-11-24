import { useCallback, useEffect, useState } from "react";

function useOnScreen(ref, triggerOnce, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useCallback(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [triggerOnce]);

  useEffect(() => {
    if (!ref.current && !triggerOnce) {
      setIntersecting(false);
    }

    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     // Update our state when observer callback fires
    //     setIntersecting(entry.isIntersecting);
    //   },
    //   {
    //     rootMargin
    //   }
    // );
    // if (ref.current) {
    //   observer.observe(ref.current);
    // }
    // return () => {
    //   observer.unobserve(ref.current);
    // };
  });

  return isIntersecting;
}

export default useOnScreen;
