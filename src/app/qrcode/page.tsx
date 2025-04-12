'use client';

// import React from 'react';
import { useQRCode } from 'next-qrcode';

function qrcode() {
  const { Image } = useQRCode();

  return (
    <Image
      text={'https://github.com/bunlong/next-qrcode'}
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}

export default qrcode;