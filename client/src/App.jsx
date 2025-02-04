import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    // Function to fetch users
    const fetchUsers = async () => {
        const res = await axios.get("https://backend-72ur.onrender.com/users");
        setUsers(res.data);
    };

    // Fetch users when the component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("https://backend-72ur.onrender.com/add", { name, email });
        fetchUsers(); // Refresh list after submission
        setName("");
        setEmail("");
    };

    return (
        <div className="container">
            <h1>User Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
