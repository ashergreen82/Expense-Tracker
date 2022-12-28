import './ExpenseTable.css';
import trashCan from "./images/green trashcan icon.png";

function ExpenseTable({ expenses, setExpenses }) {
    const deleteItem = (e) => {
        console.log("deleteItem has been executed");
        console.log("All Expenses:", expenses);
        e.preventDefault();
        const rowToDelete = e.target.parentElement.parentElement.parentElement;
        console.log("The complete e: ", e);
        console.log("rowtodelete: ", rowToDelete);
        console.log("rowtodelete.id: ", rowToDelete.id);
        const newExpenses = expenses.filter((expense) => parseFloat(expense.id) !== parseFloat(rowToDelete.id));
        setExpenses(newExpenses);
    };
    const allExpenses = expenses.map((expense, key) => {
        return (
            <tr key={key} id={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td><button className="deleteButton" onClick={deleteItem}><img className="trash-can" src={trashCan}></img></button></td>
            </tr>
        );
    });
    return (
        <div className="ExpenseTable">
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    {allExpenses}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseTable;