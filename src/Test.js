import React from 'react'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

export default function Test() {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    const [amount, setAmount] = useState('');
    const amountInputRef = useRef(null);

    const handleChange = (e) => {
        setDate(e.target.value);
    };
    return (
        <div>
            <h1>SIMPLE EXPENSE TRACKER</h1>
            <h2>Add new item:</h2>
            {/* <input type="date" onChange={handleChange} ref={dateInputRef} /> */}
            <form>
                <label>Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What did you spend it on?"
                    />
                </label>
                <form>
                    <label>Amount:
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="How much?"
                        />
                    </label>
                    <label>Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>Type:
                        <select name="type" id="type" onChange={(e) => setDate(e.target.value)}>

                            <option value="card">Card</option>
                            <option value="cash">Cash</option>
                            <option value="cryptocoin">Cryptocoin</option>
                            <option value="other">Other</option>

                        </select>
                    </label>
                </form>
            </form>
        </div>
    );
}