import { useState, useEffect } from 'react';


import { userService } from '@/services';
import { NavLink } from './NavLink';

export { Nav };

function Nav() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const subscription = userService.token.subscribe(x => setToken(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // Show only after log in
    if (!token) return null;

    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='navbar-nav'>
                <NavLink href="/" exact className="nav-item nav-link"></NavLink>
                <a onClick={logout} className='nav-item nav-link'>Logout</a>
            </div>
        </nav>
    );
}