# Test Suite Documentation

This directory contains the test suite for the User Management Application.

## Test Structure

```
spec/
├── components/           # Component tests
│   ├── UserTable.spec.js # Tests for the main table component
│   └── UserModal.spec.js # Tests for the user details modal
└── services/            # Service tests
    └── userService.spec.js # Tests for the API service
```

## Test Coverage

### UserTable Component Tests
- Initial loading state
- Data rendering
- Pagination functionality
- User deletion
- Modal interaction
- Error handling
- Link functionality

### UserModal Component Tests
- User details rendering
- Modal visibility control
- Link attributes
- Optional data handling
- Close functionality

### UserService Tests
- API calls
- Network error handling
- Response parsing
- Edge cases
- Data validation

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test File
```bash
npm test -- UserTable
```

### Watch Mode
```bash
npm test -- --watch
```

## Test Utilities

The test suite uses:
- Jest as the test runner
- React Testing Library for component testing
- User Event for simulating user interactions
- JSDOM for DOM environment simulation

## Writing New Tests

When adding new tests:
1. Place component tests in `spec/components/`
2. Place service tests in `spec/services/`
3. Follow the existing naming convention: `ComponentName.spec.js`
4. Use the provided test utilities and mocks

## Mock Data

Test data is defined in each test file and includes:
- Complete user objects
- Edge cases
- Error scenarios

## Best Practices

1. Test user interactions, not implementation details
2. Use meaningful test descriptions
3. Test both success and error cases
4. Keep tests independent
5. Clean up after each test 