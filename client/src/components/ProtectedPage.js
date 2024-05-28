import React, { useEffect } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  
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
                <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>rounded corners</DemoPaper>
      <DemoPaper square>square corners</DemoPaper>
    </Stack>
                <Checkbox {...label} defaultChecked />
      <Checkbox {...label} />
      <Checkbox {...label} disabled />
      
      <Checkbox {...label} disabled checked />
            </div>
        )
      }
    </div>
  )
}

export default ProtectedPage
