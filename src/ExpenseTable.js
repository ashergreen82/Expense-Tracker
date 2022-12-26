function ExpenseTable(props) {
    function DeleteItem() {
        alert("Haha!  I am not going to delete that!!!  You still need it")
        console.log("ExpenseTable function executed")
    }
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
                            <>
                                <tr key={key}>
                                    <button id="deleteButton" img src="D:\Asher's Documents\Computer Programming\SDMM\Assignments\expense-tracker\images\green trashcan icon.png" onClick={DeleteItem}></button>
                                    <td>{props.type}</td>
                                    <td>{props.name}</td>
                                    <td>{props.date}</td>
                                    <td>{props.amount}</td>
                                    <td>{props.description}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default ExpenseTable;