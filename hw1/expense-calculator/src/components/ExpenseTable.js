import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#f0f0f0'};
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const RowsPerPageInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 1rem;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

function ExpenseTable({ expenses, onDeleteExpense }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate pagination
  const totalPages = Math.ceil(expenses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentExpenses = expenses.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setRowsPerPage(value);
      setCurrentPage(1); // Reset to first page when changing rows per page
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Amount ($)</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense, index) => (
            <tr key={startIndex + index}>
              <Td>{expense.category}</Td>
              <Td>${expense.amount.toLocaleString()}</Td>
              <Td>
                <DeleteButton onClick={() => onDeleteExpense(startIndex + index)}>
                  Delete
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <PaginationContainer>
        <PaginationControls>
          <PageButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          {getPageNumbers().map((pageNum) => (
            <PageButton
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              active={currentPage === pageNum}
            >
              {pageNum}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </PageButton>
        </PaginationControls>
        
        <div>
          <RowsPerPageInput
            type="number"
            min="1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          />
          <PageInfo>
            Showing {startIndex + 1}-{Math.min(endIndex, expenses.length)} of {expenses.length} expenses
          </PageInfo>
        </div>
      </PaginationContainer>
    </TableContainer>
  );
}

export default ExpenseTable; 