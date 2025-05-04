import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './api/queryClient';
import AdminAuth from './components/AdminAuth';
import { ThemeProvider } from '@gravity-ui/uikit';
import { BooksPage } from './pages/BooksPage';
import { Layout } from './components/Layout';
import { AddPage } from './pages/AddPage';
import { AuthorsAndGenresPage } from './pages/AuthorsAndGenresPage';

import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Проверяем токен при монтировании и следим за изменениями
        setIsAuthenticated(!!localStorage.getItem('adminToken'));
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // или null
    }
    console.log(isAuthenticated);

    return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme="light">
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AdminAuth />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Layout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<BooksPage />} />
                            <Route path="books" element={<BooksPage />} />
                            <Route path="add" element={<AddPage />} />
                            <Route path="authorsAndGenres" element={<AuthorsAndGenresPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App; 