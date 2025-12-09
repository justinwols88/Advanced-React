import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  fallbackSrc = "https://via.placeholder.com/300?text=No+Image", 
  alt, 
  className, 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  const onError = () => {
    if (!errored) {
      setImgSrc(fallbackSrc);
      setErrored(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={onError}
      {...props}
    />
  );
};

export { ImageWithFallback };