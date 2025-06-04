import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Link,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function UserModal({ open, onClose, user }) {
  if (!user) return null;

  const getMapUrl = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          User Details
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Username
                </Typography>
                <Typography variant="body1">{user.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  <Link href={`mailto:${user.email}`} color="primary">
                    {user.email}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Phone
                </Typography>
                <Typography variant="body1">
                  <Link href={`tel:${user.phone}`} color="primary">
                    {user.phone}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Website
                </Typography>
                <Typography variant="body1">
                  <Link href={user.website} target="_blank" rel="noopener noreferrer" color="primary">
                    {user.website}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Street
                </Typography>
                <Typography variant="body1">{user.address?.street}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  City
                </Typography>
                <Typography variant="body1">{user.address?.city}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Zipcode
                </Typography>
                <Typography variant="body1">{user.address?.zipcode}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    mt: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                    transition: 'background-color 0.2s ease-in-out'
                  }}
                  component={Link}
                  href={getMapUrl(user.address?.geo?.lat, user.address?.geo?.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                >
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>View on Map</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Company
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="body1">{user.company?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Catch Phrase
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  {user.company?.catchPhrase}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Business
                </Typography>
                <Typography variant="body1">{user.company?.bs}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserModal; 