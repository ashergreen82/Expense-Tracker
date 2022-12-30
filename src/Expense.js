import { render } from '@testing-library/react';
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Expense.css';
import ExpenseTable from "./ExpenseTable";

export default function Expense() {
    let [name, setName] = useState("");

    let [date, setDate] = useState("");
    // const dateInputRef = useRef(null);

    let [amount, setAmount] = useState("");
    // const amountInputRef = useRef(null);
    // const typeInputRef = useRef(null);
    const mountCount = useRef(0);
    let [description, setDescription] = useState("");

    let [totalAmount, setTotalAmount] = useState(0);

    let [expenses, setExpenses] = useState([]);

    let [totalAmount1, setTotalAmount1] = useState(0);

    useEffect(() => {
        if (mountCount.current < 3) {
            const expenses = JSON.parse(localStorage.getItem('expenses'));
            if (expenses) {
                setExpenses(expenses);
            }
        } else {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
        console.log("UseEffect was fired")
        mountCount.current += 1
    }, [expenses.length]);

    function addExpense() {
        console.log("AddExpense function has executed")
        setTotalAmount(totalAmount + Number(amount))
        const expenseObject = { name: name, date: date, amount: amount, description: description, id: Math.random(), totalAmount: totalAmount }
        // Add the newly created expense object to expenses
        const expensesCopy = []
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            expensesCopy.push(expense);
        }
        expensesCopy.push(expenseObject)
        setExpenses(expensesCopy);
        resetInputFields();
    }

    function resetInputFields() {
        setName("");
        setDate("");
        setAmount("");
        setDescription("");
    }

    return (
        <div>
            <div id="header">
                <h1 id="title">THE UGLIEST SIMPLE EXPENSE TRACKER IN THE WORLD</h1>
                <h1 id="total_amount">Total: {totalAmount}</h1>
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
                setTotalAmount={setTotalAmount}
                totalAmount={totalAmount}
                setTotalAmount1={setTotalAmount1}
                totalAmount1={totalAmount1}
            />
        </div>
    );
}

