import React, { useState, useCallback } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'; // Required CSS for styling

const ImageCropper = ({ image, onCropComplete, onBack }) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const cropperRef = React.useRef(null);

  // Handle crop changes
  const onCropChange = useCallback((cropper) => {
    const coordinates = cropper.getCoordinates();
    setCroppedAreaPixels({
      x: coordinates.left,
      y: coordinates.top,
      width: coordinates.width,
      height: coordinates.height,
    });
  }, []);

  // Generate cropped image
  const handleCropImage = useCallback(async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            onCropComplete(croppedImageUrl);
          }
        }, 'image/jpeg');
      }
    }
  }, [onCropComplete]);

  // Continue without cropping
  const handleContinueWithoutCropping = () => {
    onCropComplete(image);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Crop Image</h2>
          <p className="text-gray-600">
            Drag to move the crop area, use handles to resize, or continue without cropping.
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="relative border rounded-lg mb-6" style={{ height: '400px' }}>
        <Cropper
          ref={cropperRef}
          src={image}
          stencilProps={{
            handlers: true, // Enable resize handles
            lines: true, // Show grid lines
            movable: true, // Allow moving the crop area
            resizable: true, // Allow resizing via handles
          }}
          defaultCoordinates={{
            width: 200,
            height: 200,
            left: 0,
            top: 0,
          }}
          onChange={onCropChange}
          className="rounded-lg overflow-hidden"
        />
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            Size: {croppedAreaPixels ? `${Math.round(croppedAreaPixels.width)} × ${Math.round(croppedAreaPixels.height)} px` : 'Adjust crop area'}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleContinueWithoutCropping}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Use Original
          </button>
          <button
            onClick={handleCropImage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Crop & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;