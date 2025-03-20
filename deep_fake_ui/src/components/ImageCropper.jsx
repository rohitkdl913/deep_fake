import React, { useState, useRef, useEffect } from 'react';

const ImageCropper = ({ image, onCropComplete, onBack }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [cropStartPos, setCropStartPos] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);
  const [moving, setMoving] = useState(false);
  const [moveStartPos, setMoveStartPos] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);
  
  // Initialize crop position and size when image loads
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const containerRect = imgContainerRef.current.getBoundingClientRect();
      setImageSize({
        width: containerRect.width,
        height: containerRect.height
      });
      
      // Initialize crop to center of image with reasonable size
      const initialSize = Math.min(containerRect.width, containerRect.height) * 0.5;
      setCrop({
        x: (containerRect.width - initialSize) / 2,
        y: (containerRect.height - initialSize) / 2,
        width: initialSize,
        height: initialSize
      });
    };
  }, [image]);
  
  // Start drawing crop area
  const handleMouseDown = (e) => {
    if (isCursorInCropArea(e)) {
      startMovingCrop(e);
    } else if (isCursorOnResizeHandle(e)) {
      startResizingCrop(e);
    } else {
      startDrawingCrop(e);
    }
  };
  
  // Start drawing new crop area from scratch
  const startDrawingCrop = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    setCrop({
      x,
      y,
      width: 0,
      height: 0
    });
    
    setCropStartPos({ x, y });
    setResizing(true);
    setResizeCorner('bottomRight');
  };
  
  // Start moving existing crop area
  const startMovingCrop = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    setMoveStartPos({
      mouseX: e.clientX - containerRect.left,
      mouseY: e.clientY - containerRect.top,
      cropX: crop.x,
      cropY: crop.y
    });
    setMoving(true);
  };
  
  // Start resizing existing crop area
  const startResizingCrop = (e) => {
    const corner = getCursorResizeHandle(e);
    if (corner) {
      const containerRect = imgContainerRef.current.getBoundingClientRect();
      setCropStartPos({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      });
      setResizing(true);
      setResizeCorner(corner);
    }
  };
  
  // Continue drawing/resizing/moving crop area
  const handleMouseMove = (e) => {
    if (resizing) {
      resizeCropArea(e);
    } else if (moving) {
      moveCropArea(e);
    }
  };
  
  // Resize crop area based on mouse position
  const resizeCropArea = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;
    
    // Constrain to image bounds
    const boundedX = Math.max(0, Math.min(currentX, containerRect.width));
    const boundedY = Math.max(0, Math.min(currentY, containerRect.height));
    
    let newCrop = { ...crop };
    
    switch (resizeCorner) {
      case 'topLeft':
        newCrop = {
          x: boundedX,
          y: boundedY,
          width: crop.x + crop.width - boundedX,
          height: crop.y + crop.height - boundedY
        };
        break;
      case 'topRight':
        newCrop = {
          x: crop.x,
          y: boundedY,
          width: boundedX - crop.x,
          height: crop.y + crop.height - boundedY
        };
        break;
      case 'bottomLeft':
        newCrop = {
          x: boundedX,
          y: crop.y,
          width: crop.x + crop.width - boundedX,
          height: boundedY - crop.y
        };
        break;
      case 'bottomRight':
        newCrop = {
          x: crop.x,
          y: crop.y,
          width: boundedX - crop.x,
          height: boundedY - crop.y
        };
        break;
      default:
        break;
    }
    
    // Ensure width and height are positive
    if (newCrop.width >= 20 && newCrop.height >= 20) {
      setCrop(newCrop);
    } else if (newCrop.width < 20) {
      // Handle negative width (flipping)
      if (resizeCorner === 'topLeft' || resizeCorner === 'bottomLeft') {
        setResizeCorner(resizeCorner === 'topLeft' ? 'topRight' : 'bottomRight');
        setCrop({
          ...newCrop,
          x: crop.x + crop.width,
          width: 20
        });
      } else {
        setCrop({
          ...newCrop,
          width: 20
        });
      }
    } else if (newCrop.height < 20) {
      // Handle negative height (flipping)
      if (resizeCorner === 'topLeft' || resizeCorner === 'topRight') {
        setResizeCorner(resizeCorner === 'topLeft' ? 'bottomLeft' : 'bottomRight');
        setCrop({
          ...newCrop,
          y: crop.y + crop.height,
          height: 20
        });
      } else {
        setCrop({
          ...newCrop,
          height: 20
        });
      }
    }
  };
  
  // Move crop area based on mouse position
  const moveCropArea = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;
    
    // Calculate movement delta
    const deltaX = currentX - moveStartPos.mouseX;
    const deltaY = currentY - moveStartPos.mouseY;
    
    // Calculate new position
    let newX = moveStartPos.cropX + deltaX;
    let newY = moveStartPos.cropY + deltaY;
    
    // Constrain to image bounds
    newX = Math.max(0, Math.min(newX, containerRect.width - crop.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - crop.height));
    
    setCrop({
      ...crop,
      x: newX,
      y: newY
    });
  };
  
  // Finish drawing/resizing/moving crop area
  const handleMouseUp = () => {
    setResizing(false);
    setMoving(false);
    setCropStartPos(null);
    setMoveStartPos(null);
  };
  
  // Check if cursor is inside the crop area
  const isCursorInCropArea = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    return (
      mouseX >= crop.x + 10 &&
      mouseX <= crop.x + crop.width - 10 &&
      mouseY >= crop.y + 10 &&
      mouseY <= crop.y + crop.height - 10
    );
  };
  
  // Check if cursor is on a resize handle
  const isCursorOnResizeHandle = (e) => {
    return getCursorResizeHandle(e) !== null;
  };
  
  // Get which resize handle the cursor is on
  const getCursorResizeHandle = (e) => {
    const containerRect = imgContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    const handleSize = 12;
    
    // Check corners
    // Top-left
    if (
      mouseX >= crop.x - handleSize/2 &&
      mouseX <= crop.x + handleSize/2 &&
      mouseY >= crop.y - handleSize/2 &&
      mouseY <= crop.y + handleSize/2
    ) {
      return 'topLeft';
    }
    
    // Top-right
    if (
      mouseX >= crop.x + crop.width - handleSize/2 &&
      mouseX <= crop.x + crop.width + handleSize/2 &&
      mouseY >= crop.y - handleSize/2 &&
      mouseY <= crop.y + handleSize/2
    ) {
      return 'topRight';
    }
    
    // Bottom-left
    if (
      mouseX >= crop.x - handleSize/2 &&
      mouseX <= crop.x + handleSize/2 &&
      mouseY >= crop.y + crop.height - handleSize/2 &&
      mouseY <= crop.y + crop.height + handleSize/2
    ) {
      return 'bottomLeft';
    }
    
    // Bottom-right
    if (
      mouseX >= crop.x + crop.width - handleSize/2 &&
      mouseX <= crop.x + crop.width + handleSize/2 &&
      mouseY >= crop.y + crop.height - handleSize/2 &&
      mouseY <= crop.y + crop.height + handleSize/2
    ) {
      return 'bottomRight';
    }
    
    return null;
  };
  
  // Get cursor style based on position
  const getCursorStyle = (e) => {
    if (!imgContainerRef.current) return 'default';
    
    if (moving) return 'move';
    if (resizing) return 'nwse-resize';
    
    if (isCursorInCropArea(e)) return 'move';
    
    const corner = getCursorResizeHandle(e);
    switch (corner) {
      case 'topLeft':
      case 'bottomRight':
        return 'nwse-resize';
      case 'topRight':
      case 'bottomLeft':
        return 'nesw-resize';
      default:
        return 'crosshair';
    }
  };
  
  // Generate the cropped image
  const handleCropImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    
    // Get the scale factor between displayed image and original
    const scaleX = img.naturalWidth / imgContainerRef.current.offsetWidth;
    const scaleY = img.naturalHeight / imgContainerRef.current.offsetHeight;
    
    // Set canvas size to the cropped area
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    
    // Draw the cropped portion of the image
    ctx.drawImage(
      img,
      crop.x * scaleX, crop.y * scaleY,
      crop.width * scaleX, crop.height * scaleY,
      0, 0,
      crop.width * scaleX, crop.height * scaleY
    );
    
    // Convert to blob
    canvas.toBlob((blob) => {
      const croppedImageUrl = URL.createObjectURL(blob);
      onCropComplete(croppedImageUrl);
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crop Image</h2>
      <p className="text-gray-600 mb-2">Click and drag to create a crop area. Drag the corners to resize.</p>
      <p className="text-gray-600 mb-6">Drag from the center to move the crop area.</p>
      
      <div 
        ref={imgContainerRef}
        className="relative overflow-hidden border rounded-lg mb-6"
        style={{ cursor: moving || resizing ? 'grabbing' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          ref={imgRef}
          src={image} 
          alt="Uploaded image" 
          className="max-w-full block"
        />
        
        {/* Overlay to darken the non-selected area */}
        {crop && (
          <div className="absolute inset-0 ">
            {/* Cut-out for the selected area (transparent) */}
            <div
              className="absolute"
              style={{
                left: `${crop.x}px`,
                top: `${crop.y}px`,
                width: `${crop.width}px`,
                height: `${crop.height}px`,
                backgroundColor: 'transparent',
                boxShadow: 'inset 0 0 0 9999px rgba(0, 0, 0, 0)'
              }}
            ></div>
          </div>
        )}
        
        {/* Dotted border for the selection box */}
        {crop && (
          <div 
            className="absolute border-2 border-indigo-500 border-dashed pointer-events-none"
            style={{
              left: `${crop.x}px`,
              top: `${crop.y}px`,
              width: `${crop.width}px`,
              height: `${crop.height}px`,
              boxSizing: 'border-box',
              backgroundColor: 'transparent'
            }}
          >
            {/* Resize handles */}
            <div className="absolute w-3 h-3 bg-white border-2 border-indigo-600 rounded-full -top-1.5 -left-1.5 cursor-nwse-resize"></div>
            <div className="absolute w-3 h-3 bg-white border-2 border-indigo-600 rounded-full -top-1.5 -right-1.5 cursor-nesw-resize"></div>
            <div className="absolute w-3 h-3 bg-white border-2 border-indigo-600 rounded-full -bottom-1.5 -left-1.5 cursor-nesw-resize"></div>
            <div className="absolute w-3 h-3 bg-white border-2 border-indigo-600 rounded-full -bottom-1.5 -right-1.5 cursor-nwse-resize"></div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            Size: {Math.round(crop.width)} × {Math.round(crop.height)} px
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
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