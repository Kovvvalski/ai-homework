# Fake Store API Testing Script

This script tests the Fake Store API (https://fakestoreapi.com/products) for data validation issues.

## Features

- Validates HTTP status code (must be 200 OK)
- Checks product data for:
  - Non-empty product titles
  - Non-negative prices
  - Valid rating values (≤ 5)
- Groups and displays validation errors by product ID
- Provides detailed error messages and timestamps

## Requirements

- Python 3.6+
- Required packages (install using `pip install -r requirements.txt`):
  - requests
  - pytest

## Installation

1. Clone the repository
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the script:
```bash
python test_fake_store_api.py
```

## Output Format

The script will output:
- Timestamp of the test
- Total number of products tested
- List of validation errors (if any), grouped by product ID
- Detailed error messages for each validation failure

## Example Output

```
=== Fake Store API Test Results ===
Timestamp: 2024-01-20 15:30:45
Total products tested: 20

❌ Found 2 validation errors:

Product ID: 1
  - Invalid Price: Price must be a non-negative number: -10.99

Product ID: 5
  - Invalid Rating: Rating must be less than or equal to 5: 5.5 