# DentalX AI

DentalX AI is a web application that uses deep learning to analyze dental X-ray images and identify common conditions such as implants, fillings, cavities, and impacted teeth.

## 🌐 Live Demo
[Check it out here!](https://shirishp16.github.io/DentalX-AI)

---

## Features
- Upload or drag-and-drop a dental X-ray image
- Uses a trained AI model to classify the image
- Identifies:
  - 🦷 Implants
  - ⚙️ Fillings
  - 🕳️ Cavities
  - 🧱 Impacted Teeth
- Sample image included for quick testing
- Learn page containing information about dental x-ray classification
- Clean and responsive UI

IMPORTANT: The /model and /backend contents must be downloaded for the model to run only in local development. However, you can still view the UI and explore the other features of the site!


---

## How It Works
- Frontend built with **React + TypeScript**
- Backend model trained with **TensorFlow/Keras**
- Images are preprocessed and passed through a custom CNN model
- The model outputs multi-label predictions for each condition

---

## Getting Started (Local Development)

### Prerequisites
- Node.js
- Python 3.9 
- pip / virtualenv

1. **Clone the repository:**  
   git clone https://shirishp16.github.io/DentalX-AI 
   cd your-repo  
2. **Download Required Files:**  
   **IMPORTANT:** Download the contents of the `model` folder (pre-trained model weights and configs) and the `backend` folder (Flask API code and utilities) from the provided source. Place these files into the `/model` and `/backend` directories respectively before proceeding.  
3. **Setup Backend:**  
   cd backend  
   pip install -r requirements.txt  
   flask run  
4. **Setup Frontend:**
   cd frontend  
   npm install (if not installed already)
   npm start  

## Usage
1. Open your browser and go to `http://localhost:5001`.  
2. Drag-and-drop or select file of a panoramic dental x-ray image into the upload area.  
3. View the predicted diagnosis and confidence score.
4. Navigate to the Learn page to understand dental classifications and medical diagnostics 

## Troubleshooting
- Confirm that the `model` and `backend` folders contain the downloaded files.
- Ensure all dependencies are installed as per prerequisites.  
- Check the Flask console for error messages.

## Author

**Shirish Parasae**  
- GitHub: [shirishp16](https://github.com/shirishp16)  
- Email: shirishparasa@gmail.com  
