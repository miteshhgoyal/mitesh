// services/tokenService.js
export const tokenService = {
    setToken: (token) => {
        localStorage.setItem('config_token', token);
    },

    getToken: () => {
        return localStorage.getItem('config_token');
    },

    removeToken: () => {
        localStorage.removeItem('config_token');
        // Clean up any old user data for backward compatibility
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
    },

    isTokenExpired: (token) => {
        if (!token) return true;

        try {
            // Decode JWT payload (standard JWT format: header.payload.signature)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.warn('Token decode failed:', error);
            return true;
        }
    },

    // Optional: Get decoded payload without verification (for display/expiry check)
    getPayload: (token) => {
        try {
            if (!token) return null;
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            return null;
        }
    }
};
