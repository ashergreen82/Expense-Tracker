import { useRef, useEffect, useState } from 'react';
import './ExpenseTable.css';
import trashCan from "./images/green trashcan icon.png";



function ExpenseTable({ expenses, setExpenses, setTotalAmount, totalAmount, setTotalAmount1, totalAmount1 }) {
    console.log("Expenses: ", expenses)
    console.log("totalAmount: ", totalAmount)
    console.log("totalAmount1: ", totalAmount1)
    const deleteItem = (e) => {
        e.preventDefault();
        const rowToDelete = e.target.parentElement.parentElement.parentElement;
        const newExpenses = expenses.filter((expense) => parseFloat(expense.id) !== parseFloat(rowToDelete.id));
        setExpenses(newExpenses);
        setTotalAmount(Number(totalAmount) - Number(e.target.parentElement.parentElement.previousSibling.innerText));
    };

    const allExpenses = expenses.map((expense, key) => {
        return (
            <tr key={key} id={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td><button className="deleteButton" onClick={deleteItem}><img className="trash-can" src={trashCan}></img></button></td>
            </tr>
        );
    });
    function tabulateTotal() {
        console.log("Tabulate Total has exectued")
        for (let i = 0; i <= expenses.length; i++) {
            setTotalAmount1(totalAmount1 += expenses[i].amount);
        }
    }
    setTotalAmount(tabulateTotal);
    // setTotalAmount1(300);
    return (
        <div className="ExpenseTable">
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    {allExpenses}
                </tbody>
            </table>
            <div>Total: {totalAmount1}</div>
        </div>
    );
}

export default ExpenseTable;