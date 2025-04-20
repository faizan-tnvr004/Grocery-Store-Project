const { sql, poolPromise } = require('../db');

const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  if (!categoryName) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('categoryName', sql.VarChar(100), categoryName)
      .execute('get_products_by_category');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching products by category:', error);

    if (error.number === 50000) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};

module.exports = { getProductsByCategory };
