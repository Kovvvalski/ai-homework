import React from 'react';
import styled from 'styled-components';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import Results from './components/Results';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

function App() {
  const [expenses, setExpenses] = React.useState([]);

  const addExpense = (category, amount) => {
    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const calculateResults = () => {
    if (expenses.length === 0) {
      return {
        total: 0,
        averageDaily: 0,
        topExpenses: []
      };
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageDaily = total / 30;
    const topExpenses = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return {
      total,
      averageDaily,
      topExpenses
    };
  };

  return (
    <Container>
      <Title>Expense Calculator</Title>
      <ExpenseForm onAddExpense={addExpense} />
      <MainContent>
        <ExpenseTable expenses={expenses} onDeleteExpense={deleteExpense} />
        <Results results={calculateResults()} />
      </MainContent>
    </Container>
  );
}

export default App; 