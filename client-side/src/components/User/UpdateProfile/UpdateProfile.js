import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
  const { id } = useParams();
  const handleUpdateUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h2>Update User {id}</h2>

      <form onSubmit={handleUpdateUser}>
        <input type='text' name='name' placeholder='Name' required />
        <br />
        <br />
        <input type='email' name='email' placeholder='Email' required />
        <br />
        <br />
        <input type='submit' value='Add User' />
      </form>
    </div>
  );
};

export default UpdateProfile;
