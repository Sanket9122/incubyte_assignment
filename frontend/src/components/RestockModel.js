import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { restockSweet } from '../api/sweets';

const RestockModal = ({ open, handleClose, sweet, onSuccess }) => {
  const [restockAmount, setRestockAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (restockAmount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await restockSweet(sweet.id, restockAmount);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Restock failed.');
    } finally {
      setLoading(false);
      setRestockAmount(0); // Reset form
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Restock: {sweet.name}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ my: 2 }}>
          <TextField
            label="Current Stock"
            value={sweet.quantity}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Restock Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={restockAmount}
            onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
            error={!!error}
            helperText={error}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
          {loading ? 'Restocking...' : 'Confirm Restock'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestockModal;