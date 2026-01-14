import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  setUser(data);
  };
  fetchUser();

  return () => {
  console.log('Cleanup: stopping any pending requests');
  };
  }, [userId]); // Runs when userId changes

  return <div>{user ? user.name : 'Loading...'}</div>;
 }



