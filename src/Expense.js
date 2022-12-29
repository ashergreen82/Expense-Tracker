import { render } from '@testing-library/react';
import React from 'react'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Expense.css';
import ExpenseTable from "./ExpenseTable";

export default function Expense() {
    let [name, setName] = useState("");
    // const [startDate, setStartDate] = useState(new Date());

    let [date, setDate] = useState("");
    // const dateInputRef = useRef(null);

    let [amount, setAmount] = useState("");
    // const amountInputRef = useRef(null);

    // let [type, setType] = useState('Card');
    // const typeInputRef = useRef(null);

    let [description, setDescription] = useState("");

    let [totalAmount, setTotalAmount] = useState(0);

    let [expenses, setExpenses] = useState([]);
    // const handleChange = (e) => {
    //     setDate(e.target.value);
    // };

    function addExpense() {
        // console.log(expenses)
        console.log("AddExpense function has executed")
        setTotalAmount(totalAmount + Number(amount))
        const expenseObject = { name: name, date: date, amount: amount, description: description, id: Math.random(), totalAmount: totalAmount }
        console.log(expenseObject)
        // Add the newly created expense object to expenses
        const expensesCopy = []
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            expensesCopy.push(expense);
        }
        expensesCopy.push(expenseObject)
        // totalAmount += Number(amount);
        console.log("Amount = ", amount);
        console.log("Total= ", totalAmount);
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
            {/* <input type="date" onChange={handleChange} ref={dateInputRef} /> */}
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
            />
        </div>
    );
}

