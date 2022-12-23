function ExpenseTable(props) {
    console.log(props.expenses)
    return (
        <div className="ExpenseTable">
            <table>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                {props.expenses.map((props, key) => {
                    return (
                        <tr key={key}>
                            <td>{props.type}</td>
                            <td>{props.name}</td>
                            <td>{props.date}</td>
                            <td>{props.amount}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default ExpenseTable;