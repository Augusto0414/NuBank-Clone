import { AuthContext } from 'context/AuthContex';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
