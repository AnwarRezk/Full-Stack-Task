import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { authApi } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<{
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await authApi.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Welcome to the application
        </Typography>
        {profile && (
          <>
            <Typography variant="h6" color="text.secondary">
              Hello, {profile.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {profile.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since: {new Date(profile.createdAt).toLocaleDateString()}
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignOut}
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
} 