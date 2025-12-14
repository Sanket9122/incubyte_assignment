import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { purchaseSweet } from '../api/sweets';

const SweetCard = ({ sweet, onUpdate }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const isInStock = sweet.quantity > 0;

  const handlePurchase = async () => {
    try {
      // Simulate purchase and update the local list
      await purchaseSweet(sweet.id);
      onUpdate(); 
      setAlertOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography gutterBottom variant="h6" component="div">
            {sweet.name}
          </Typography>
          <Chip 
            label={isInStock ? `Stock: ${sweet.quantity}` : 'Out of Stock'}
            color={isInStock ? 'success' : 'error'}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          **Category:** {sweet.category}
        </Typography>
        <Typography variant="h5" color="primary.main" sx={{ mt: 1 }}>
           ₹{sweet.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="large" 
          variant="contained"
          onClick={handlePurchase}
          disabled={!isInStock}
        >
          {isInStock ? 'Buy Now' : 'Sold Out'}
        </Button>
      </CardActions>

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          Purchased {sweet.name}!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SweetCard;