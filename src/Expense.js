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
        if (name === "") {
            alert("Where did you purchase this item?");
        } else if (date === "") {
            alert("When did you buy this item or use the service?");
        } else if (amount === "") {
            alert("How much did you spend on this item?");
        } else if (description === "") {
            alert("Please enter a description");
        } else {
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
            <div className="row mb-3">
                <div className="col-9">
                    <h1 id="title">SIMPLE EXPENSE TRACKER</h1>
                </div>
                <div className="col">
                    <h1 id="total_amount">Total:</h1>
                </div>
                <div className="col">
                    <h1 id="number_amount">${parseFloat(totalAmount).toFixed(2)}</h1>
                </div>
            </div>
            <div>
                <form className="border mb-4">
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Location:</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Where was it purchased?"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col">
                            <label className="form-label">Date:</label>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col">
                            <label className="form-label">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What did you spend it on?"
                                required
                            />
                        </div>
                        <div className="col">
                            <label className="form-label">Amount:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="How much?"
                                required
                            />
                        </div>
                    </div>
                    <button class="button-18" className="AddExpense" onClick={addExpense}>Add Expense</button>
                </form>
            </div>
            <ExpenseTable
                expenses={expenses}
                setExpenses={setExpenses}
            />
        </div>
    );
}

