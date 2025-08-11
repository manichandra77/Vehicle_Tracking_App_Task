# Vehicle Tracking System

A modern, interactive web application that simulates real-time vehicle movement on a map. Built with React, TypeScript, and Leaflet for smooth animations and professional UI design.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cbbfe086-f4f8-4ba7-824f-65e0121aab82" />


## Features

### Core Functionality
- **Real-time Vehicle Simulation**: Smooth vehicle movement along predefined routes
- **Interactive Map**: Powered by Leaflet with zoom, pan, and responsive design
- **Route Visualization**: Dynamic polyline drawing that extends as the vehicle moves
- **Playback Controls**: Play, pause, reset, and speed adjustment (0.5x to 4x)

### Live Data Display
- **Current Position**: Real-time latitude/longitude coordinates
- **Timestamp Tracking**: Shows current time from route data
- **Speed Calculation**: Dynamic speed display in km/h
- **Progress Tracking**: Visual progress bar and elapsed time counter

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Interactive Help**: Built-in help panel with detailed usage instructions
- **Professional Styling**: Production-ready design with attention to detail

##  Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Mapping Library**: Leaflet for interactive maps
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks for local state management

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and navigate to the provided local URL

## How to Use

### Quick Start
1. Click the **Play** button to start the vehicle simulation
2. Watch the blue vehicle marker move along the route
3. Use speed controls to adjust simulation speed (0.5x to 4x)
4. Click **Pause** to pause or **Reset** to restart from the beginning

### Control Panel
- **Play/Pause Button**: Start or stop the vehicle movement simulation
- **Reset Button**: Return vehicle to starting position and reset timer
- **Speed Controls**: Choose from 0.5x (slow) to 4x (fast) simulation speeds

### Live Data Panel
- **Route Progress**: Visual progress bar showing completion percentage
- **Current Position**: Real-time GPS coordinates (latitude, longitude)
- **Timestamp**: Current time from the route data
- **Speed**: Calculated vehicle speed in km/h
- **Elapsed Time**: Total simulation runtime

### Map Features
- **Vehicle Marker**: Blue circular marker showing current position
- **Completed Route**: Solid blue line showing the path already traveled
- **Full Route**: Dashed gray line showing the complete planned route
- **Interactive Controls**: Zoom and pan the map while simulation runs

### Help System
Click the **Help** button (blue circle with question mark) in the bottom-right corner for detailed instructions and feature explanations.

## Project Structure

```
src/
├── components/
│   ├── VehicleMap.tsx      # Main map component with Leaflet integration
│   ├── ControlPanel.tsx    # Playback controls (play, pause, speed)
│   ├── MetadataPanel.tsx   # Live data display panel
│   └── HelpPanel.tsx       # Interactive help and instructions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports

public/
└── dummy-route.json       # Sample GPS route data
```

##  Route Data Format

The application uses a JSON file with GPS coordinates and timestamps:

```json
[
  {
    "latitude": 17.385044,
    "longitude": 78.486671,
    "timestamp": "2024-07-20T10:00:00Z"
  },
  {
    "latitude": 17.385145,
    "longitude": 78.486772,
    "timestamp": "2024-07-20T10:00:05Z"
  }
]
```

### Data Requirements
- **latitude**: GPS latitude coordinate (required)
- **longitude**: GPS longitude coordinate (required)
- **timestamp**: ISO 8601 timestamp (optional, used for speed calculation)

## Design Features

### Visual Design
- **Modern Dark Theme**: Professional dark background with blue accents
- **Glassmorphism Effects**: Translucent panels with backdrop blur
- **Smooth Animations**: Fluid vehicle movement and UI transitions
- **Responsive Layout**: Adapts to different screen sizes automatically

### Color Palette
- **Primary Blue**: #3B82F6 (controls, vehicle marker, completed route)
- **Secondary Emerald**: #10B981 (success states, progress indicators)
- **Accent Orange**: #F97316 (speed indicators, warnings)
- **Neutral Grays**: Various shades for backgrounds and text

### Typography
- **Headings**: Bold, clear hierarchy for easy scanning
- **Body Text**: Optimized for readability with proper contrast
- **Monospace**: Used for coordinates and technical data

## Performance Features

- **Smooth Animation**: 60fps vehicle movement with interpolation
- **Efficient Rendering**: Optimized map updates and DOM manipulation
- **Responsive Loading**: Fast initial load with progressive enhancement
- **Memory Management**: Proper cleanup of intervals and event listeners

## Mobile Support

- **Touch-Friendly**: Large buttons and touch targets
- **Responsive Grid**: Layout adapts to mobile screens
- **Optimized Performance**: Smooth animations on mobile devices
- **Accessible Design**: Proper contrast ratios and readable text

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization
- **Route Data**: Replace `public/dummy-route.json` with your own GPS data
- **Styling**: Modify Tailwind classes or add custom CSS
- **Map Tiles**: Change the OpenStreetMap tiles to other providers
- **Animation Speed**: Adjust timing in the VehicleMap component

## Key Features Explained

### Real-Time Simulation
The application simulates real-time vehicle movement by:
1. Loading GPS coordinates from a JSON file
2. Interpolating smooth movement between points
3. Updating the map marker position at regular intervals
4. Drawing the route progressively as the vehicle moves

### Interactive Controls
Users can control the simulation with:
- Play/pause functionality for starting and stopping
- Speed adjustment from 0.5x to 4x normal speed
- Reset capability to return to the starting position
- Real-time feedback on all control interactions

### Professional UI
The interface features:
- Clean, modern design with attention to detail
- Smooth hover effects and micro-interactions
- Consistent spacing and typography
- Professional color scheme and visual hierarchy
---
