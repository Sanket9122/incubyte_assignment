import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, 
  Alert, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { addSweet } from '../api/sweets';

const initialSweetState = {
  name: '',
  category: '',
  price: '',
  quantity: ''
};

const categories = ['Chocolate', 'Candy', 'Pastry', 'Gummy', 'Hard Candy', 'Other'];

const AddSweetModal = ({ open, handleClose, onSuccess }) => {
  const [sweetData, setSweetData] = useState(initialSweetState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSweetData({ ...sweetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!sweetData.name || !sweetData.category || sweetData.price === '' || sweetData.quantity === '') {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addSweet(sweetData);
      onSuccess();
      setSweetData(initialSweetState);
    } catch (err) {
      setError(err.message || 'Failed to add sweet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Sweet</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <Box component="form" sx={{ mt: 1, minWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Sweet Name"
            name="name"
            value={sweetData.name}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={sweetData.category}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Price ($)"
            name="price"
            type="number"
            value={sweetData.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Initial Quantity in Stock"
            name="quantity"
            type="number"
            value={sweetData.quantity}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
          {loading ? 'Adding...' : 'Add Sweet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSweetModal;