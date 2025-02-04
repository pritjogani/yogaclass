import { useState, useEffect } from "react";


function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    
    const fetchUsers = async () => {
        const res = await fetch("https://backend-72ur.onrender.com/users",
            { method:"GET"}
        );
        setUsers(res.data);
    };

    
    useEffect(() => {
        fetchUsers();
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("https://backend-72ur.onrender.com/add", { name, email });
        fetchUsers(); 
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
