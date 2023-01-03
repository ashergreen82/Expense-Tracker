import { render } from '@testing-library/react';
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Expense.css';
import ExpenseTable from "./ExpenseTable";

export default function Expense() {
    const [name, setName] = useState("");

    const [date, setDate] = useState("");
    // const dateInputRef = useRef(null);

    const [amount, setAmount] = useState("");
    // const amountInputRef = useRef(null);
    // const typeInputRef = useRef(null);
    const mountCount = useRef(0);
    const [description, setDescription] = useState("");

    const [totalAmount, setTotalAmount] = useState("0");

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const mountCountLimit = process.env.ENV === "PROD" ? 1 : 2;
        if (mountCount.current < mountCountLimit) {
            const allExpenses = JSON.parse(localStorage.getItem('expenses'));
            if (allExpenses) {
                setExpenses(allExpenses);
                setTotalAmount(getExpenseTotals());
            }
        } else {
            localStorage.setItem("expenses", JSON.stringify(expenses));

        }
        console.log("UseEffect was fired, employee escored out the building.")
        mountCount.current += 1
    }, [expenses.length]);

    function addExpense() {
        console.log("AddExpense function has executed")
        const expenseObject = { name: name, date: date, amount: Number(amount), description: description, id: Math.random() }
        // Add the newly created expense object to expenses
        const expensesCopy = []
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            expensesCopy.push(expense);
        }
        expensesCopy.push(expenseObject)
        setExpenses(expensesCopy);
        resetInputFields();
        setTotalAmount("0");
        setTotalAmount(getExpenseTotals());
    }

    function resetInputFields() {
        setName("");
        setDate("");
        setAmount("");
        setDescription("");
    }

    const getExpenseTotals = () => {
        let newTotal = 0;
        expenses.forEach((expenseItem) => {
            newTotal += parseFloat(expenseItem.amount);
        });
        return newTotal;
    };

    useEffect(() => {
        setTotalAmount(getExpenseTotals());
    }, [expenses]);

    return (
        <div>
            <div id="header">
                <h1 id="title">SIMPLE EXPENSE TRACKER</h1>
                <h1 id="total_amount">Total: ${parseFloat(totalAmount).toFixed(2)}</h1>
                {/* <h1 id="total_amount">Total1: {totalAmount1}</h1> */}
            </div>
            <form>
                <label>Location:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Where was it purchased?"
                        required
                    />
                </label>
                <label id="datelable">Date:
                    <input id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What did you spend it on?"
                        required
                    />
                </label>
                <label>Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="How much?"
                        required
                    />
                </label>
            </form>
            <button className="AddExpense" onClick={addExpense}>Add Expense</button>
            <ExpenseTable
                expenses={expenses}
                setExpenses={setExpenses}
            />
            <h1 id="total_amount">Total: ${parseFloat(totalAmount).toFixed(2)}</h1>
        </div>
    );
}

