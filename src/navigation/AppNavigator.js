import React, { useContext } from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
    const { user } = useContext(AuthContext);

    return user ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
