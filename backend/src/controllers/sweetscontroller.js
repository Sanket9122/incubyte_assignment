const sweetService = require('../services/sweetservice');

/**
 * GET /api/sweets - Retrieves all sweets.
 */
exports.getSweets = async (req, res, next) => {
  try {
    const sweets = await sweetService.findAll();
    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/sweets - Adds a new sweet (Admin only).
 */
exports.addSweet = async (req, res, next) => {
  try {
    const newSweet = await sweetService.createSweet(req.body);
    res.status(201).json(newSweet);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/sweets/:id/restock - Restocks a sweet (Admin only).
 */
exports.restockSweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    
    // Convert amount to integer
    const restockAmount = parseInt(amount, 10);
    if (isNaN(restockAmount) || restockAmount <= 0) {
      return res.status(400).json({ message: 'Restock amount must be a positive number.' });
    }

    const updatedSweet = await sweetService.restock(id, restockAmount);
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/sweets/:id/purchase - Purchases a sweet.
 */
exports.purchaseSweet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const purchasedSweet = await sweetService.purchase(id);
    res.status(200).json(purchasedSweet);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/sweets/:id - Deletes a sweet (Admin only).
 */
exports.deleteSweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    await sweetService.deleteSweet(id);
    res.status(204).send(); // 204 No Content on successful deletion
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/sweets/search - Searches for sweets.
 */
exports.searchSweets = async (req, res, next) => {
  try {
    const { query } = req.query; // Expects a query parameter like ?query=chocolate
    const results = await sweetService.search(query);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// --- Update Sweet (PUT) Placeholder ---
exports.updateSweet = async (req, res, next) => {
  // Implementation Note: You would implement the logic here to call a service method
  // like sweetService.update(req.params.id, req.body)
  res.status(501).json({ message: 'Update Sweet endpoint not yet fully implemented.' });
};