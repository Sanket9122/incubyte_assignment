import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SweetCard from '../components/Sweetcard';
import { fetchSweets } from '../api/sweets';

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadSweets = async () => {
    setLoading(true);
    try {
      const data = await fetchSweets();
      setSweets(data);
    } catch (error) {
      console.error('Failed to fetch sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const filteredSweets = useMemo(() => {
    if (!searchTerm) return sweets;
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return sweets.filter(sweet =>
      sweet.name.toLowerCase().includes(lowerCaseSearch) ||
      sweet.category.toLowerCase().includes(lowerCaseSearch) ||
      sweet.price.toString().includes(lowerCaseSearch)
    );
  }, [sweets, searchTerm]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Our Sweet Collection
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          label="Search by Name, Category, or Price"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredSweets.length > 0 ? (
            filteredSweets.map((sweet) => (
              <Grid item key={sweet.id} xs={12} sm={6} md={4} lg={3}>
                <SweetCard sweet={sweet} onUpdate={loadSweets} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="text.secondary">
                No sweets found matching your search.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;