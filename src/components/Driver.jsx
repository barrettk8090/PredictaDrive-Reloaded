import { useState } from 'react';
 
const DriverComponent = () => {
    // component code goes here

const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
});

const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the form data
    console.log(formData);
}

return (
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input
            type='text'
            value={formData.name}
            onChange={(e) => setFormData({ ... formData, email: e.target.value})}
            />
        </label>
        <br/>
        <label>
            Email:
            <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value})}
            />
        </label>
        <br/>
        <label>
            Message:
            <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value})}
            />
        </label>
        <br/>
        <button type="submit">Submit</button>
    </form>
);
};

export default DriverComponent;