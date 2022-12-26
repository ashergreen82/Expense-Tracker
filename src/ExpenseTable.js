function ExpenseTable(props) {
    console.log(props.expenses)
    const propsLength = props.expenses.length
    if (propsLength < 1) {
        console.log("Items will go here")
        return (
            <div className="ExpenseTable">
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    <p id="intro_text">Your added items will show up here</p>
                </table>
            </div>
        );
    } else {
        return (
            <div className="ExpenseTable">
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    {props.expenses.map((props, key) => {
                        return (
                            <tr key={key}>
                                <td>{props.type}</td>
                                <td>{props.name}</td>
                                <td>{props.date}</td>
                                <td>{props.amount}</td>
                                <td>{props.description}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default ExpenseTable;