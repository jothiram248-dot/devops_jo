import { useEffect } from 'react';

const useImagePreloader = (imageSources) => {
  useEffect(() => {
    imageSources.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [imageSources]);
};

export default useImagePreloader;