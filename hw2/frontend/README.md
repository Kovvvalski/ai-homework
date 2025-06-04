# User Management Application

A modern React application for managing user data with a responsive UI and comprehensive testing.

## Features

- Display user data in a responsive table layout
- View detailed user information in a modal
- Delete users with confirmation feedback
- Pagination support
- Interactive links (email, phone, website)
- Map integration for user locations
- Comprehensive test coverage

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── UserTable.js    # Main table component
│   │   └── UserModal.js    # User details modal
│   ├── services/          # API services
│   │   └── userService.js # User data fetching
│   └── App.js             # Main application component
├── spec/                  # Test files
│   ├── components/        # Component tests
│   └── services/         # Service tests
└── package.json          # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

### Test Coverage

The project includes comprehensive tests for:
- Component rendering and interactions
- API service calls
- Error handling
- Edge cases

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Dependencies

### Main Dependencies
- React 18.2.0
- Material-UI 5.13.0
- Axios 1.4.0

### Development Dependencies
- Jest
- React Testing Library
- User Event
- JSDOM

## API Integration

The application fetches user data from:
```
https://jsonplaceholder.typicode.com/users
```

## Component Documentation

### UserTable Component

The main table component that displays user data with the following features:
- Responsive table layout
- Pagination
- User deletion
- Row click to view details
- Interactive website links

### UserModal Component

Modal component for displaying detailed user information:
- Personal information
- Company details
- Address with map integration
- Interactive links (email, phone, website)

## Error Handling

The application includes comprehensive error handling for:
- Network errors
- API failures
- Invalid data
- Missing optional fields

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 