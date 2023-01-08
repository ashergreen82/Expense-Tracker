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
            <tr key={key} id={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>
                    <button className="deleteButton" onClick={deleteItem}>
                        <img className="trash-can" src={trashCan} alt="X"></img>
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>{allExpenses}</tbody>
        </table>
    );
}

export default ExpenseTable;