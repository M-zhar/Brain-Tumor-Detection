# NeuraScan - Brain Tumor Detection

A Flask-based web application with React frontend for brain tumor detection using machine learning.

## Features

- Brain scan image upload and processing
- Integration with a pre-trained brain tumor detection model
- Clear visualization of detection results with confidence scores
- Educational information about brain tumors and the detection process
- Responsive design that works across all devices

## Tech Stack

- **Frontend:** React with TypeScript, Tailwind CSS
- **Backend:** Flask (Python)
- **ML Framework:** TensorFlow
- **Image Processing:** Pillow, NumPy

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd api
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the Flask backend:
   ```
   npm run start-api
   ```
   This will start the Flask server on port 5000

2. In a separate terminal, start the React frontend:
   ```
   npm run dev
   ```
   This will start the development server, typically on port 5173

3. Open your browser and navigate to http://localhost:5173

## Project Structure

```
├── api/                  # Flask backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── uploads/          # Directory for uploaded images
├── public/               # Static assets
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
└── package.json          # Node.js dependencies
```

## Important Note

This application is intended for educational and research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.