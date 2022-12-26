function ExpenseTable({ expenses, setExpenses }) {
    const deleteItem = (e) => {
        console.log("deleteItem has been executed")
        e.preventDefault();
        const rowToDelete = e.target.parentElement.parentElement;
        const newExpenses = expenses.filter((expense) => parseFloat(expense.id) !== parseFloat(rowToDelete.id));
        console.log("rowToDelete id is: ", rowToDelete.id)
        console.log("Rowtodelete: ", rowToDelete)
        console.log("e target value is: ", e.target.parentElement)
        console.log("e targue vull value is: ", e.target)
        console.log("e is: ", e)
        setExpenses(newExpenses);
    };
    const allExpenses = expenses.map((expense, key) => {
        return (
            <tr>
                <td>{expense.name}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td><button className="deleteButton" img src="./images/green trashcan icon.png" onClick={deleteItem}>X</button></td>
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