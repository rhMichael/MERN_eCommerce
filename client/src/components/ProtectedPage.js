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
      if (response.success) {
        // setUser(response.data);
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.error);
      }
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      message.error("Please login to continue");
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between item-center bg-primary p-6">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            SHEY MP
          </h1>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>

            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
            >
              <Avatar
                shape="circle"
                icon={<i className="ri-notification-3-line "></i>}
                className="cursor-pointer"
              />
            </Badge>

            <i
              className="ri-logout-box-r-line ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-5">{children}</div>

        {
          <Notifications
            notifications={notifications}
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
            reloadNotifications={getNotifications}
          />
        }
      </div> )
  )

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
