import { fetchUsers } from '../../src/services/userService';

describe('userService', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'https://johndoe.com',
      company: {
        name: 'Company A',
        catchPhrase: 'Best company ever',
        bs: 'Making things better'
      },
      address: {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001',
        geo: {
          lat: 40.7128,
          lng: -74.0060
        }
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      website: 'https://janesmith.com',
      company: {
        name: 'Company B',
        catchPhrase: 'Innovation at its best',
        bs: 'Changing the world'
      },
      address: {
        street: '456 Oak St',
        suite: 'Suite 100',
        city: 'Los Angeles',
        zipcode: '90001',
        geo: {
          lat: 34.0522,
          lng: -118.2437
        }
      }
    }
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches users successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    const result = await fetchUsers();
    expect(result).toEqual(mockUsers);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  test('handles network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchUsers()).rejects.toThrow('Network error');
  });

  test('handles non-200 responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users: 404 Not Found');
  });

  test('handles malformed JSON responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      }
    });

    await expect(fetchUsers()).rejects.toThrow('Invalid JSON');
  });

  test('handles empty response array', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    const result = await fetchUsers();
    expect(result).toEqual([]);
  });

  test('handles response with missing optional fields', async () => {
    const userWithMissingFields = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'https://johndoe.com'
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [userWithMissingFields]
    });

    const result = await fetchUsers();
    expect(result).toEqual([userWithMissingFields]);
  });

  test('handles response with null values', async () => {
    const userWithNullValues = {
      id: 1,
      name: 'John Doe',
      email: null,
      phone: null,
      website: null,
      company: null,
      address: null
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [userWithNullValues]
    });

    const result = await fetchUsers();
    expect(result).toEqual([userWithNullValues]);
  });
}); 