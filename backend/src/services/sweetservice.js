let sweetsData = [
  { id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 2.50, quantity: 50 },
  { id: '2', name: 'Sour Gummy Worms', category: 'Candy', price: 1.25, quantity: 15 },
  { id: '3', name: 'Red Velvet Pastry', category: 'Pastry', price: 4.00, quantity: 0 },
  { id: '4', name: 'Peanut Butter Bar', category: 'Chocolate', price: 2.00, quantity: 22 },
];
// ----------------------------------------------------------------


class SweetServiceError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'SweetServiceError';
    this.statusCode = statusCode;
  }
}

/**
 * Retrieves all sweets from the inventory.
 * @returns {Array} List of sweets.
 */
exports.findAll = async () => {
  // Simulate DB delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return sweetsData;
};

/**
 * Adds a new sweet to the inventory.
 * @param {object} sweetData - New sweet data { name, category, price, quantity }.
 * @returns {object} The newly created sweet.
 */
exports.createSweet = async (sweetData) => {
  // Simple validation
  if (!sweetData.name || !sweetData.category || sweetData.price == null || sweetData.quantity == null) {
    throw new SweetServiceError('Missing required sweet fields.', 400);
  }

  // Create unique ID (replace with DB generated ID)
  const newId = (parseInt(sweetsData[sweetsData.length - 1].id) + 1).toString();
  
  const newSweet = { 
    id: newId, 
    ...sweetData, 
    price: Number(sweetData.price),
    quantity: Number(sweetData.quantity),
  };
  
  sweetsData.push(newSweet);
  return newSweet;
};

/**
 * Handles the restock operation for a sweet.
 * @param {string} id - Sweet ID.
 * @param {number} amount - Quantity to restock.
 * @returns {object} The updated sweet.
 */
exports.restock = async (id, amount) => {
  const sweet = sweetsData.find(s => s.id === id);
  if (!sweet) {
    throw new SweetServiceError('Sweet not found.', 404);
  }
  
  if (amount <= 0 || !Number.isInteger(amount)) {
    throw new SweetServiceError('Restock amount must be a positive integer.', 400);
  }

  sweet.quantity += amount;
  return sweet;
};

/**
 * Handles the purchase operation, decrementing quantity.
 * @param {string} id - Sweet ID.
 * @returns {object} The purchased sweet.
 */
exports.purchase = async (id) => {
  const sweet = sweetsData.find(s => s.id === id);
  if (!sweet) {
    throw new SweetServiceError('Sweet not found.', 404);
  }
  
  if (sweet.quantity <= 0) {
    throw new SweetServiceError('Sweet is out of stock.', 400);
  }

  // Atomic operation in a real DB
  sweet.quantity -= 1; 
  return sweet;
};

/**
 * Deletes a sweet from the inventory.
 * @param {string} id - Sweet ID.
 */
exports.deleteSweet = async (id) => {
  const initialLength = sweetsData.length;
  sweetsData = sweetsData.filter(s => s.id !== id);

  if (sweetsData.length === initialLength) {
    throw new SweetServiceError('Sweet not found.', 404);
  }
  return { success: true };
};

/**
 * Searches for sweets based on criteria.
 * @param {string} query - Search term (name or category).
 * @returns {Array} List of matching sweets.
 */
exports.search = async (query) => {
  if (!query) {
    return sweetsData;
  }
  const lowerQuery = query.toLowerCase();
  
  return sweetsData.filter(sweet =>
    sweet.name.toLowerCase().includes(lowerQuery) ||
    sweet.category.toLowerCase().includes(lowerQuery) ||
    sweet.price.toString().includes(lowerQuery)
  );
};