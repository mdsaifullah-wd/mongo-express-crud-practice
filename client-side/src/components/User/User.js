import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
        event.target.reset();
      });
  };
  const handleDeleteUser = (id) => {
    const confirm = window.confirm('Are sure to delete the user?');
    if (confirm) {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount === 1) {
            setUsers(users.filter((u) => u._id !== id));
          }
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type='text' name='name' placeholder='Name' required />
        <br />
        <br />
        <input type='email' name='email' placeholder='Email' required />
        <br />
        <br />
        <input type='submit' value='Add User' />
      </form>

      <div>
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <b>{u.name},</b> <small>{u.email}</small>
              <Link to={`/users/${u._id}`}>Update</Link>
              <button onClick={() => handleDeleteUser(u._id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
