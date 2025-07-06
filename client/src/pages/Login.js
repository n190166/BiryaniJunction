import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    }
};

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const { darkMode, theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ 
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center' 
        }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ width: '100%' }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: theme => theme.palette.background.paper,
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: theme => theme.palette.text.primary,
                                textAlign: 'center'
                            }}
                        >
                            Welcome Back
                        </Typography>
                    </motion.div>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <motion.div variants={itemVariants}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: theme => theme.palette.text.primary,
                                        },
                                    },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    backgroundColor: theme => theme.palette.primary.main,
                                    color: theme => theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
                                    '&:hover': {
                                        backgroundColor: theme => 
                                            theme.palette.mode === 'dark' 
                                                ? theme.palette.grey[100] 
                                                : theme.palette.grey[900],
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        style={{
                                            color: theme => theme.palette.primary.main,
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}
