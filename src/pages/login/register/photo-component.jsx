import React from 'react';
import LottieAnimacao from 'lottie-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AvatarImage from '../../../assets/avatar-image.json';

export function FotoComponent({ imagePreview, currentUser }) {
  if (imagePreview) {
    return (
      <LazyLoadImage
        height="100%"
        effect="blur"
        src={imagePreview} // use normal <img> attributes as props
        width="100%"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }

  if (currentUser?.photoURL) {
    return (
      <LazyLoadImage
        height="100%"
        effect="blur"
        src={currentUser.photoURL} // use normal <img> attributes as props
        width="100%"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }

  return <LottieAnimacao animationData={AvatarImage} />;
}
