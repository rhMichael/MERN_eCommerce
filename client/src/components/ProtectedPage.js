import React, { useEffect } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router';

function ProtectedPage({ children }) {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();

            if(response.success)
            {
                setUser(response.data);
            } else {
                navigate('/login');
                message.error(response.error);
            }
        } catch (error) {
            navigate('/login');
            message.error(error.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            validateToken();
        } else {
            message.error('Please login to continue');
            navigate('/login');
        }
    }, []);
  return (
    <div>
      {
        user && (
            <div className='p-5'>
                {user.name}
                {children}
                
            </div>
        )
      }
    </div>
  )
}

export default ProtectedPage
