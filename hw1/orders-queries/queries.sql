-- ========================================
-- SQL Script for Orders Analysis (SQLite)
-- ========================================

-- Task 1: Calculate the total sales volume for March 2024
SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date >= '2024-03-01' AND order_date < '2024-04-01';

-- ----------------------------------------

-- Task 2: Find the customer who spent the most overall
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- ----------------------------------------

-- Task 3: Calculate the average order value for the last three months relative to the current date
SELECT AVG(amount) AS average_order_value_last_3_months
FROM orders
WHERE order_date >= DATE('now', '-3 months');
