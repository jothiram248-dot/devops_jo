import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className, priority = false }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    if (priority) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
    
    img.onload = () => {
      setLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src, priority]);

  return (
    <div className="relative overflow-hidden bg-dark-200">
      <div 
        className={`absolute inset-0 bg-dark-200 ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default LazyImage;