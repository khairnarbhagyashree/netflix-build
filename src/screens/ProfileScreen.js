import { signOut } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Nav';
import "./ProfileScreen.css";
import PlansScreen from './PlansScreen';



function ProfileScreen() {
    const user = useSelector(selectUser);

    const navigate = useNavigate();


    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen_body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_info">
                    <img src="https://ih0.redbubble.net/image.618393699.1999/flat,400x400,075,f.u2.jpg" alt="" />
                    <div className="profileScreen_details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen_plans">
                            <h3>Plans</h3>
                            <PlansScreen />
                            <button
                                onClick={() => signOut(auth)}
                                className='profileScreen_signOut'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileScreen;