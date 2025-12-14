import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, CircularProgress, Alert, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import { fetchSweets, deleteSweet } from '../api/sweets';
import RestockModal from '../components/RestockModel';
import AddSweetModal from '../components/AddStockModel';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const loadSweets = async () => {
    setLoading(true);
    try {
      const data = await fetchSweets();
      setSweets(data);
    } catch (error) {
      console.error('Failed to fetch sweets:', error);
      alert('Error loading sweet data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleRestockClick = (sweet) => {
    setSelectedSweet(sweet);
    setRestockModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleRestockSuccess = () => {
    setRestockModalOpen(false);
    loadSweets();
    setSnackbarMessage('Sweet restocked successfully!');
    setSnackbarOpen(true);
  };

  const handleAddSuccess = () => {
    setAddModalOpen(false);
    loadSweets();
    setSnackbarMessage('New sweet added successfully!');
    setSnackbarOpen(true);
  };

  const handleDeleteSweet = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteSweet(id);
        loadSweets();
        setSnackbarMessage(`${name} deleted successfully!`);
        setSnackbarOpen(true);
      } catch (error) {
        alert('Error deleting sweet.');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5 }} align="center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" color="primary">
          Admin Inventory Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add New Sweet
        </Button>
      </Box>

      {sweets.length === 0 ? (
        <Alert severity="info">The sweet inventory is empty.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Price ($)</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sweets.map((sweet) => (
                <TableRow key={sweet.id} hover>
                  <TableCell>{sweet.id}</TableCell>
                  <TableCell>{sweet.name}</TableCell>
                  <TableCell>{sweet.category}</TableCell>
                  <TableCell align="right">{sweet.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={sweet.quantity}
                      color={sweet.quantity < 10 ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary"
                      onClick={() => handleRestockClick(sweet)}
                      aria-label="restock"
                    >
                      <InventoryIcon />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDeleteSweet(sweet.id, sweet.name)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modals for Admin Actions */}
      {selectedSweet && (
        <RestockModal
          open={restockModalOpen}
          handleClose={() => setRestockModalOpen(false)}
          sweet={selectedSweet}
          onSuccess={handleRestockSuccess}
        />
      )}
      
      <AddSweetModal
        open={addModalOpen}
        handleClose={() => setAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const Chip = ({ label, color, size }) => (
    <Box sx={{ display: 'inline-block' }}>
        <div style={{
            padding: '2px 8px',
            borderRadius: '16px',
            backgroundColor: color === 'warning' ? '#ff980033' : '#4caf5033',
            color: color === 'warning' ? '#ff9800' : '#4caf50',
            fontSize: size === 'small' ? '0.75rem' : '0.875rem',
            fontWeight: 500,
        }}>
            {label}
        </div>
    </Box>
);

export default AdminDashboard;