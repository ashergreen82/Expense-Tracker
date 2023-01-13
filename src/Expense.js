import { render } from '@testing-library/react';
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Expense.css';
import ExpenseTable from "./ExpenseTable";

export default function Expense() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const mountCount = useRef(0);
    const [description, setDescription] = useState("");
    const [totalAmount, setTotalAmount] = useState("0");
    const [expenses, setExpenses] = useState([]);
    // const [form, setForm ] = useState({
    //     name: "",
    //     date: "",
    //     amount: "",
    //     description: "",
    // })

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
            const expensesCopy = [...expenses, expenseObject]
            // for (let i = 0; i < expenses.length; i++) {
            //     const expense = expenses[i];
            //     expensesCopy.push(expense);
            // }
            // expensesCopy.push(expenseObject)
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

    function handleChange(e) {
        console.log(e)
        e.preventDefault();
        console.log("id: ", e.target.id)
        switch (e.target.id) {
            case "name":
                setName(e.target.value);
                console.log("setname: ", e.target.value)
                console.log("name value", name)
                break;
            case "date":
                setDate(e.target.value);
                console.log("setdate: ", e.target.value)
                break;
            case 'amount':
                setAmount(e.target.value);
                console.log("setamount: ", e.target.value)
                break;
            case "description":
                setDescription(e.target.value);
                console.log("setdescription: ", e.target.value)
                break;
        }
    }

    useEffect(() => {
        setTotalAmount(getExpenseTotals());
    }, [expenses]);

    return (
        <div>
            <div className="row m-3">
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
                <form className="border mb-4 p-3 bg-light">
                    <div className="row">
                        <div className="col">
                            <label className="form-label px-0">Location:</label>
                            <div className="input-group">
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="Where was it purchased?"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col">
                            <label className="form-label px-0">Date:</label>
                            <div className="input-group">
                                <input
                                    id="date"
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col">
                            <label className="form-label px-0">Description:</label>
                            <input
                                id="description"
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                                placeholder="What did you spend it on?"
                                required
                            />
                        </div>
                        <div className="col">
                            <label className="form-label px-0">Amount:</label>
                            <input
                                id="amount"
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={handleChange}
                                placeholder="How much?"
                                required
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center m-3">
                        <button type="button" className="btn btn-primary" onClick={addExpense}>Add Expense</button>
                    </div>

                </form>
            </div>
            <ExpenseTable
                expenses={expenses}
                setExpenses={setExpenses}
            />
        </div>
    );
}

