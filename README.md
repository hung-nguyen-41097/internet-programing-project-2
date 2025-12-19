# Car Rental Application

A modern, responsive car rental application built with React and Vite. This application allows users to browse available cars, filter by various criteria, and make reservations with an intuitive user interface.

## 🚗 Features

- **Car Browsing**: View a comprehensive catalog of available rental cars with detailed specifications
- **Advanced Search & Filtering**: Filter cars by make, model, category, transmission type, and more
- **Real-time Availability**: Check car availability and pricing in real-time
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop and mobile devices
- **Reservation System**: Complete booking flow with form validation
- **State Management**: Efficient state management using Redux Toolkit
- **Modern UI**: Clean and intuitive interface built with Material-UI and React Bootstrap

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest version of React for building the user interface
- **Vite** - Next-generation frontend build tool for fast development
- **Redux Toolkit** - State management solution
- **React Router DOM** - Client-side routing
- **Material-UI (@mui/material)** - Modern React UI framework
- **React Bootstrap** - Bootstrap components for React
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client for API requests
- **Supabase** - Backend as a Service (BaaS) for database and authentication
- **React Icons** - Icon library
- **React Helmet** - Document head management

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Vite Plugin React** - Fast Refresh and JSX support

## 📁 Project Structure

```
car-rental-app/
├── public/
│   └── data/
│       ├── cars.json          # Car data
│       └── orders.json        # Order data
├── src/
│   ├── assets/                # Images and static assets
│   │   ├── company-logo.avif
│   │   └── logo.avif
│   ├── components/            # Reusable React components
│   │   ├── car-card-list.jsx
│   │   ├── confirm-modal.jsx
│   │   ├── loading-modal.jsx
│   │   ├── menu-bar.jsx
│   │   ├── personal-avatar.jsx
│   │   ├── rental-form.jsx
│   │   ├── reservation-error.jsx
│   │   ├── search-bar.jsx
│   │   ├── selected-car-detail.jsx
│   │   └── toast-notification.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useCarData.js
│   ├── pages/                 # Page components
│   │   ├── homepage.jsx
│   │   └── reservation.jsx
│   ├── utils/                 # Utility functions
│   │   ├── api.jsx            # API configuration (Supabase)
│   │   └── storage.js
│   ├── app.css                # Global styles
│   ├── app.jsx                # Main App component
│   ├── main.jsx               # Application entry point
│   ├── store.jsx              # Redux store configuration
│   └── storeSlice.jsx         # Redux slices
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd car-rental-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🗄️ Backend API

The application uses Supabase as the backend service. The backend API is located in the `be-car-rental-app` directory and provides:

- RESTful API endpoints for car data
- Database management through Supabase
- CORS-enabled API for cross-origin requests

### API Endpoints

The backend provides the following endpoints:

- `GET /cars` - Fetch all available cars with details

## 🎨 Key Components

- **HomePage**: Main landing page with car listings and search functionality
- **Reservation**: Booking page for completing car reservations
- **CarCardList**: Displays cars in a grid layout with filtering options
- **SearchBar**: Advanced search and filter component
- **RentalForm**: Form for collecting customer information and booking details
- **SelectedCarDetail**: Detailed view of a selected car

## 🔧 Configuration

### Vite Configuration

The application uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### ESLint Configuration

Code quality is maintained using ESLint with Standard and Prettier configurations. See `eslint.config.js` for details.

## 📦 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory and can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of an Internet Programming course assignment.

## 👥 Authors

- Hung Nguyen

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- Material-UI and React Bootstrap for UI components
- Supabase for backend infrastructure
