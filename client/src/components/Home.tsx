import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { authApi } from '../services/api';

interface WelcomeMessage {
  message: string;
  status: string;
}

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<WelcomeMessage | null>(null);
  const [profile, setProfile] = useState<{
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both profile and welcome message in parallel
        const [profileData, welcomeData] = await Promise.all([
          authApi.getProfile(),
          authApi.getWelcomeMessage()
        ]);
        
        setProfile(profileData);
        setWelcomeMessage(welcomeData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
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
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <Typography component="h1" variant="h4">
          {welcomeMessage?.message || 'Welcome to the application'}
        </Typography>

        {profile && (
          <>
            <Typography variant="h6" color="text.secondary">
              Hello, {profile.name}!
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