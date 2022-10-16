import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthContext } from '../../hooks/context/AuthContext';

function Navbar() {
  const { currentUser } = useAuthContext();

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
