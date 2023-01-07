// import { useRef, useEffect, useState } from 'react';
import './ExpenseTable.css';
import trashCan from "./images/green trashcan icon.png";

function ExpenseTable({ expenses, setExpenses }) {
    console.log("Expenses: ", expenses)
    const deleteItem = (e) => {
        e.preventDefault();
        const rowToDelete = e.target.parentElement.parentElement.parentElement;
        const newExpenses = expenses.filter((expense) => parseFloat(expense.id) !== parseFloat(rowToDelete.id));
        setExpenses(newExpenses);
    };

    const allExpenses = expenses.map((expense, key) => {
        return (
            <tbody>
                <tr key={key} id={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.name}</td>
                    <td>{expense.description}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td><button className="deleteButton" onClick={deleteItem}><img className="trash-can" src={trashCan} alt="X"></img></button></td>
                </tr>
            </tbody>
        );
    });

    return (
        <table class="table .table-active">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                {allExpenses}
            </thead>
        </table>
    );
}

export default ExpenseTable;