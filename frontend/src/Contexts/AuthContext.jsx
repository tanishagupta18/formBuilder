import { createContext, useContext, useEffect, useState } from 'react';
import { USERS_URL } from '../constants';
import toast from 'react-hot-toast';

const URL = USERS_URL;

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
      setIsLoading(false);
      setIsAuthenticate(true); // Fetch current user to verify the token
    } else {
      setIsLoading(false);
    }
  }, []);

  async function login(email, password) {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}login/`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const response = await res.json();

      if (response.status === 'fail' || response.status === 'error') {
        toast.error(response.message);
        setIsLoading(false);
      } else {
        const { token, data } = response;
        localStorage.setItem('token', token); // Store token in localStorage
        setUser(data.user); // Use `data.user` if user info is separate
        setIsAuthenticate(true);
        toast.success('Logged in successfully');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong while logging in');
      setIsLoading(false);
    }
  }
  async function signup(name, email, password,passwordConfirm) {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}signup/`, {
        method: 'POST',
        body: JSON.stringify({ name,email, password,passwordConfirm }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const response = await res.json();

      if (response.status === 'fail' || response.status === 'error') {
        toast.error(response.message);
        setIsLoading(false);
      } else {
        const { token, data } = response;
        localStorage.setItem('token', token); // Store token in localStorage
        setUser(data.user); // Use `data.user` if user info is separate
        setIsAuthenticate(true);
        // toast.success('Logged in successfully');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong while registering account');
      setIsLoading(false);
    }
  }
  const updateUser = async (name) => {
    try {
      
        // Update the existing response
        const res = await fetch(`${URL}updateMe`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body: JSON.stringify({name}), // Include `form` and `responses`
        });
  
        const response = await res.json();
  
        if (response.status === "fail" || response.status === 'error') {
          toast.error(response.message);
        } else {
          setUser(response.data.user);
           toast.success("Settings updated successfully!");
          // Re-fetch folders to ensure the list is updated
          // await getAllForms();
        }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while saving the form");
    }
  };
  const updatePassword = async (passwordCurrent,password) => {
    try {
      
        // Update the existing response
        const res = await fetch(`${URL}updateMyPassword`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body: JSON.stringify({passwordCurrent,password}), // Include `form` and `responses`
        });
  
        const response = await res.json();
  
        if (response.status === "fail" || response.status === 'error') {
          toast.error(response.message);
        } else {
          setUser(response.data.user);
           toast.success("Settings updated successfully!");
          // Re-fetch folders to ensure the list is updated
          // await getAllForms();
        }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while saving the settings");
    }
  };
  

  async function getCurrentUser() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${URL}me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Pass token in Authorization header
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (data.status === 'fail' || data.status === 'error') {
        toast.error(data?.message|| 'Login Again');
        // if(data.message === 'Invalid token, Please login again' || data?.message == ''){
          setIsLoading(false);
          localStorage.removeItem('token'); // Clear token from localStorage
          setUser(null);
          setIsAuthenticate(false);
          window.location.href = '/login'; 
        // }
        
      } else {
        setUser(data.data.doc); // Assuming `data.user` contains user details
        setIsAuthenticate(true);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Failed to fetch the current user');
      // if(error === 'Invalid token, Please login again'){
        setIsLoading(false);
        localStorage.removeItem('token'); // Clear token from localStorage
        setUser(null);
        setIsAuthenticate(false);
        window.location.href = '/login'; 
      // }
      
    }
  }

const logout = async () => {
    try {
      // Make the request to the logout endpoint
      const response = await fetch(`${URL}logout`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.status == 'success') {
        throw new Error('Logout failed');
      }
      localStorage.removeItem('token'); // Clear token from localStorage
      setUser(null);
      setIsAuthenticate(false);
      // window.location.href = '/login'; 
    } catch (error) {
      toast.error('Logout failed:', error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticate, isLoading, login, logout, getCurrentUser,signup,updateUser,updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthenticate() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext was used outside AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthenticate };
