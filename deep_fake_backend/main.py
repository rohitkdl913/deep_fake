from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import numpy as np
import io
from PIL import Image
import base64
import random
import time
import uuid
import os
from typing import Optional

# Create FastAPI app
app = FastAPI(
    title="DeepFake Detector API",
    description="API for detecting deepfake images",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a temporary directory for storing uploaded images
os.makedirs("temp", exist_ok=True)

class ImageData(BaseModel):
    image: str  # Base64 encoded image

class AnalysisResult(BaseModel):
    id: str
    isDeepfake: bool
    confidence: float
    details: str

# Dummy prediction function
def predict_deepfake(image_array):
    """
    Dummy function to simulate deepfake detection
    In a real implementation, this would use your ML model
    
    Args:
        image_array: numpy array of the image
        
    Returns:
        dict: Prediction results
    """
    # Simulate processing time
    time.sleep(2)
    
    # Generate random prediction (for demonstration)
    is_deepfake = random.random() > 0.5
    confidence = random.uniform(70, 99)
    
    # Generate details based on result
    if is_deepfake:
        details = [
            "AI-generated artifacts detected in image structure.",
            "Inconsistent lighting patterns identified.",
            "Facial feature inconsistencies detected.",
            "Unusual texture patterns in key areas.",
            "Metadata analysis indicates possible manipulation."
        ]
        detail_text = random.choice(details)
    else:
        details = [
            "No manipulation patterns detected in image.",
            "Image passes all authenticity checks.",
            "Natural lighting and texture patterns confirmed.",
            "No digital artifacts found in critical areas.",
            "Image structure consistent with authentic photography."
        ]
        detail_text = random.choice(details)
    
    return {
        "id": str(uuid.uuid4()),
        "isDeepfake": is_deepfake,
        "confidence": round(confidence, 2),
        "details": detail_text
    }

@app.get("/")
async def root():
    return {"message": "DeepFake Detector API is running"}

@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze an uploaded image for deepfake detection
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to numpy array for processing
        image_array = np.array(image)
        
        # Call the prediction function
        result = predict_deepfake(image_array)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/api/analyze-base64", response_model=AnalysisResult)
async def analyze_base64_image(data: ImageData):
    """
    Analyze a base64 encoded image for deepfake detection
    """
    try:
        # Decode base64 image
        image_data = data.image
        if "base64," in image_data:
            # Remove data URL prefix if present
            image_data = image_data.split("base64,")[1]
        
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to numpy array for processing
        image_array = np.array(image)
        
        # Call the prediction function
        result = predict_deepfake(image_array)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)