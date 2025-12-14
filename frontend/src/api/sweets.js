let sweetsData = [
  { id: 1, name: 'Chocolate Truffle', category: 'Chocolate', price: 2.50, quantity: 50 },
  { id: 2, name: 'Sour Gummy Worms', category: 'Candy', price: 1.25, quantity: 15 },
  { id: 3, name: 'Red Velvet Pastry', category: 'Pastry', price: 4.00, quantity: 0 },
  { id: 4, name: 'Peanut Butter Bar', category: 'Chocolate', price: 2.00, quantity: 22 },
];

export const fetchSweets = async () => {
 
  await new Promise(resolve => setTimeout(resolve, 500));
  return sweetsData;
};

export const purchaseSweet = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const sweet = sweetsData.find(s => s.id === id);
  if (sweet && sweet.quantity > 0) {
    sweet.quantity -= 1;
    return sweet;
  }
  throw new Error('Not enough stock.');
};

export const restockSweet = async (id, amount) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const sweet = sweetsData.find(s => s.id === id);
  if (sweet) {
    sweet.quantity += amount;
    return sweet;
  }
  throw new Error('Sweet not found.');
};

export const addSweet = async (newSweet) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const id = Math.max(...sweetsData.map(s => s.id)) + 1;
  const sweetWithId = { ...newSweet, id, quantity: Number(newSweet.quantity), price: Number(newSweet.price) };
  sweetsData.push(sweetWithId);
  return sweetWithId;
};

export const deleteSweet = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  sweetsData = sweetsData.filter(s => s.id !== id);
  return { success: true };
};