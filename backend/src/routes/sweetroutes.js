const express = require('express');
const sweetsController = require('../controllers/sweetscontroller');
const { authenticateToken, requireAdmin } = require('../middleware/authmiddleware');

const router = express.Router();

// --- Public/Protected Routes ---

// GET /api/sweets - View all available sweets
router.get('/', sweetsController.getSweets);

// GET /api/sweets/search - Search for sweets
router.get('/search', sweetsController.searchSweets);


// --- Fully Protected Routes (Require JWT) ---

// POST /api/sweets - Add a new sweet (Admin only)
router.post('/', authenticateToken, requireAdmin, sweetsController.addSweet);

// PUT /api/sweets/:id - Update a sweet's details (Admin only)
router.put('/:id', authenticateToken, requireAdmin, sweetsController.updateSweet);

// DELETE /api/sweets/:id - Delete a sweet (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, sweetsController.deleteSweet);

// POST /api/sweets/:id/purchase - Purchase a sweet (Requires Auth)
router.post('/:id/purchase', authenticateToken, sweetsController.purchaseSweet);

// POST /api/sweets/:id/restock - Restock a sweet (Admin only)
router.post('/:id/restock', authenticateToken, requireAdmin, sweetsController.restockSweet);

module.exports = router;