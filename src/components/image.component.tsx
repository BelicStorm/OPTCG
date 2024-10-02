import  { useState } from 'react';
import { getFullImagePath } from '../utils/getFullImagePath.utils';

interface CustomImageProps {
    addBaseUrl?:boolean,
    onClickAction?: (e:any)=> void,
    src:string,
    alt:string,
    className:string,
    loadingImg?:string
}

const MyImage = ({ src, addBaseUrl = false, alt, className, onClickAction, loadingImg }:CustomImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleOnClick = (e:any)=> onClickAction ? onClickAction(e) : ""

  // Dynamically manage image path with base URL if required
  src = addBaseUrl ? getFullImagePath(src) : src;
  const loadingImage = loadingImg ? loadingImg : "https://placehold.co/600x400?text=loading..."
  const errorImage = error ? "https://placehold.co/600x400?text=Image\n+not+Found" : ""
  return (
    <img
      src={error ? errorImage : loading ? loadingImage : src}
      alt={error ? 'Error' : alt}
      loading='lazy'
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      onClick={handleOnClick}
    />
  );
};

export default MyImage;