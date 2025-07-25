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

### 1. Clone the repo
```bash
git clone https://github.com/shirishparasa/DentalX-AI.git
cd dentalx-ai
