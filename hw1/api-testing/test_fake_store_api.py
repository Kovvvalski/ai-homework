import requests
from typing import List, Dict, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ValidationError:
    product_id: int
    error_type: str
    details: str

class FakeStoreAPITester:
    def __init__(self):
        self.base_url = "https://fakestoreapi.com/products"
        self.errors: List[ValidationError] = []
        self.products_count = 0

    def validate_product(self, product: Dict[str, Any]) -> List[ValidationError]:
        """Validate a single product object and return any validation errors."""
        product_errors = []
        product_id = product.get('id', 'Unknown ID')

        # Validate title
        title = product.get('title', '')
        if not isinstance(title, str) or not title.strip():
            product_errors.append(ValidationError(
                product_id=product_id,
                error_type="Empty Title",
                details=f"Title is empty or not a string: {title}"
            ))

        # Validate price
        price = product.get('price', None)
        if not isinstance(price, (int, float)) or price < 0:
            product_errors.append(ValidationError(
                product_id=product_id,
                error_type="Invalid Price",
                details=f"Price must be a non-negative number: {price}"
            ))

        # Validate rating
        rating = product.get('rating', {})
        if not isinstance(rating, dict):
            product_errors.append(ValidationError(
                product_id=product_id,
                error_type="Invalid Rating Structure",
                details=f"Rating is not a dictionary: {rating}"
            ))
        else:
            rate = rating.get('rate', None)
            if not isinstance(rate, (int, float)) or rate > 5:
                product_errors.append(ValidationError(
                    product_id=product_id,
                    error_type="Invalid Rating",
                    details=f"Rating must be less than or equal to 5: {rate}"
                ))

        return product_errors

    def test_api(self) -> None:
        """Test the Fake Store API and validate all products."""
        try:
            # Make the API request
            response = requests.get(self.base_url)
            
            # Check HTTP status code
            if response.status_code != 200:
                print(f"❌ API Error: Received status code {response.status_code}")
                return

            # Parse the response
            products = response.json()
            
            if not isinstance(products, list):
                print("❌ API Error: Response is not a list of products")
                return

            # Store total number of products
            self.products_count = len(products)

            # Validate each product
            for product in products:
                product_errors = self.validate_product(product)
                self.errors.extend(product_errors)

            # Print results
            self.print_results()

        except requests.RequestException as e:
            print(f"❌ Network Error: {str(e)}")
        except ValueError as e:
            print(f"❌ JSON Parsing Error: {str(e)}")
        except Exception as e:
            print(f"❌ Unexpected Error: {str(e)}")

    def print_results(self) -> None:
        """Print the test results in a formatted way."""
        print("\n=== Fake Store API Test Results ===")
        print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Total products tested: {self.products_count}")
        
        if not self.errors:
            print("\n✅ All products passed validation!")
            return

        print(f"\n❌ Found {len(self.errors)} validation errors:")
        
        # Group errors by product ID
        errors_by_product = {}
        for error in self.errors:
            if error.product_id not in errors_by_product:
                errors_by_product[error.product_id] = []
            errors_by_product[error.product_id].append(error)

        # Print errors for each product
        for product_id, errors in errors_by_product.items():
            print(f"\nProduct ID: {product_id}")
            for error in errors:
                print(f"  - {error.error_type}: {error.details}")

def main():
    tester = FakeStoreAPITester()
    tester.test_api()

if __name__ == "__main__":
    main() 