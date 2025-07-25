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
- Clean and responsive UI

IMPORTANT: The /model and /backend contents must be downloaded for the model to run. 


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
   git clone https://github.com/your-username/your-repo.git  
   cd your-repo  
2. **Download Required Files:**  
   **IMPORTANT:** Download the contents of the `model` folder (pre-trained model weights and configs) and the `backend` folder (Flask API code and utilities) from the provided source. Place these files into the `/model` and `/backend` directories respectively before proceeding.  
3. **Setup Frontend:**  
   cd frontend  
   npm install  
   npm start  
4. **Setup Backend:**  
   cd backend  
   pip install -r requirements.txt  
   flask run  

## Usage
1. Open your browser and go to `http://localhost:3000`.  
2. Drag-and-drop a dental x-ray image into the upload area.  
3. View the predicted diagnosis and confidence score.  

## Troubleshooting
- Confirm that the `model` and `backend` folders contain the downloaded files.
- Ensure all dependencies are installed as per prerequisites.  
- Check the Flask console for error messages.

## License
MIT License. See [LICENSE](LICENSE) for details.
