import './ExpenseTable.css';
import trashCan from "./images/green trashcan icon.png";

function ExpenseTable({ expenses, setExpenses }) {
    const deleteItem = (e) => {
        e.preventDefault();
        const rowToDelete = e.target.parentElement.parentElement.parentElement;
        const newExpenses = expenses.filter((expense) => parseFloat(expense.id) !== parseFloat(rowToDelete.id));
        setExpenses(newExpenses);
    };

    const allExpenses = expenses.map((expense, key) => (
        <tr key={key} id={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.name}</td>
            <td>{expense.description}</td>
            <td className="d-flex flex-row align-items-center justify-content-between">${expense.amount.toFixed(2)}
                <button className="btn btn-sm" onClick={deleteItem}>
                    <img className="trash-can deleteButton" src={trashCan} alt="X" ></img>
                </button>
            </td>

        </tr>
    ));

    return (
        <table className="table table-bordered table-striped table-light">
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