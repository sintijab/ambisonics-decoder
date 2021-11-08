import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

export const useEventListener = (eventName, handler, element = window) => {
    const savedHandler: React.MutableRefObject<any> = useRef();
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
    useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element]
    );
  }

  export const fetchData: (url: string) => Promise<string> = async (url) => {
    try {
      const res: any = await fetch(url);
      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
      }
        const blob = await res.blob();
        const data = URL.createObjectURL(blob);
        return data;
    } catch (e) {
      throw new Error('Service err');
    }
  }