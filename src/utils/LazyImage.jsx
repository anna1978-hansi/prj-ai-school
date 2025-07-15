// src/utils/LazyImage.jsx
import React, { useRef, useState, useEffect } from 'react';

const LazyImage = ({ src, alt, placeholder, rootMargin = '200px', lazy = true, ...rest }) => {
  const imgRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy); // lazy=false时直接可见

  useEffect(() => {
    if (!lazy) return; // 不懒加载，直接显示
    let observer;
    if (imgRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(imgRef.current);
    }
    return () => observer && observer.disconnect();
  }, [rootMargin, lazy]);

  return (
    <div style={{ position: 'relative', minHeight: 120 }}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt="占位图"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'blur(8px)',
            zIndex: 1
          }}
        />
      )}
      <img
        ref={imgRef}
        src={isVisible ? src : undefined}
        alt={alt}
        style={isLoaded ? {} : { visibility: 'hidden' }}
        onLoad={() => setIsLoaded(true)}
        {...rest}
      />
    </div>
  );
};

export default LazyImage;