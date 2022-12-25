import { render } from '@testing-library/react';
import React from 'react'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import ExpenseTable from "./ExpenseTable";

export default function Expense() {
    let [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    let [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    let [amount, setAmount] = useState('');
    const amountInputRef = useRef(null);

    let [type, setType] = useState('Card');
    const typeInputRef = useRef(null);

    let [expenses, setExpenses] = useState([]);
    const handleChange = (e) => {
        setDate(e.target.value);
    };

    function addExpense() {
        // console.log(expenses)
        console.log("AddExpense function has executed")
        const expenseObject = { type: type, name: name, date: date, amount: amount }
        console.log(expenseObject)
        // Add the newly created expense object to expenses
        const expensesCopy = []
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            expensesCopy.push(expense);
        }
        expensesCopy.push(expenseObject)
        setExpenses(expensesCopy)
        // resetInputFields();
    }

    function resetInputFields() {
        setName("")
        setDate("")
        setAmount("")
        setType("")
    }

    return (
        <div>
            <h1>SIMPLE EXPENSE TRACKER</h1>
            <h2>Add new item:</h2>
            {/* <input type="date" onChange={handleChange} ref={dateInputRef} /> */}
            <form>
                <label>Name:
                    <input
                        type="text"
                        value={expenses.name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What did you spend it on?"
                    />
                </label>
                <form>
                    <label>Amount:
                        <input
                            type="number"
                            value={expenses.amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="How much?"
                        />
                    </label>
                    <label>Date:
                        <input
                            type="date"
                            value={expenses.date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>Type:
                        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>

                            <option value="Card">Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Cryptocoin">Cryptocoin</option>
                            <option value="Other">Other</option>

                        </select>
                    </label>
                </form>
            </form>
            <button className="AddExpense" onClick={addExpense}>Add The New Expense</button>
            <ExpenseTable expenses={expenses} />
        </div>
    );

}

