export default function RentalForm(){

    return(
        <>
            <div id="rental-form">
                <h2>Enter Your Car Information</h2>
                <form>
                    <label>Select A DIMO Vehicle</label>
                    <select>
                        <option value="Real Car 1">Real Car 1</option>
                        <option value="Real Car 2">Real Car 2</option>
                        <option value="Real Car 3">Real Car 3</option>
                    </select>
                    <br/>
                    <label>Select A Trip Start Date</label>
                    <input type="datetime-local"></input>
                    <br/>
                    <label>Select A Trip End Date</label>
                    <input type="datetime-local"></input>
                </form>
            </div>
        </>
    )
}