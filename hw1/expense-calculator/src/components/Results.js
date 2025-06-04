import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResultItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ResultValue = styled.p`
  font-size: 1.2rem;
  color: #3498db;
  font-weight: 600;
`;

const TopExpensesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TopExpenseItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

function Results({ results }) {
  const { total, averageDaily, topExpenses } = results;

  return (
    <ResultsContainer>
      <ResultItem>
        <ResultTitle>Total Expenses:</ResultTitle>
        <ResultValue>${total.toLocaleString()}</ResultValue>
      </ResultItem>
      
      <ResultItem>
        <ResultTitle>Average Daily Expense:</ResultTitle>
        <ResultValue>${averageDaily.toLocaleString()}</ResultValue>
      </ResultItem>
      
      <ResultItem>
        <ResultTitle>Top 3 Expenses:</ResultTitle>
        <TopExpensesList>
          {topExpenses.map((expense, index) => (
            <TopExpenseItem key={index}>
              {expense.category} (${expense.amount.toLocaleString()})
            </TopExpenseItem>
          ))}
        </TopExpensesList>
      </ResultItem>
    </ResultsContainer>
  );
}

export default Results; 