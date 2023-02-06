import { useCallback, useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>,
  cb: (event?: MouseEvent | TouchEvent) => void
) => {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current) return;
      if (!event.target) return;
      if (ref.current.contains(event.target as Node)) return;

      cb(event);
    },
    [ref, cb]
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [listener]);
};

export default useOnClickOutside;
