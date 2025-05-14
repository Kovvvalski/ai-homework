import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function ExpenseForm({ onAddExpense }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (category.trim() && !isNaN(amount) && parseFloat(amount) > 0) {
      onAddExpense(category.trim(), parseFloat(amount));
      setCategory('');
      setAmount('');
    } else {
      alert('Please enter valid category and amount values.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Button type="submit">Add Expense</Button>
        </InputGroup>
      </form>
    </FormContainer>
  );
}

export default ExpenseForm; 