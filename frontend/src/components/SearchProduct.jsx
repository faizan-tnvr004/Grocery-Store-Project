import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavBar from "./TopNavBar"; // adjust path if needed
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchProduct = () => {
  const query = useQuery();
  const searchTerm = query.get("name") || "";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/search/${encodeURIComponent(
            searchTerm
          )}`
        );
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch products. Try again."
        );
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <>
      <TopNavBar />
      <Box
        sx={{
          background: "linear-gradient(135deg,rgb(202, 120, 53) 0%, #fff 100%)",
          minHeight: "80vh",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "#2e7d23", fontWeight: "bold" }}
        >
          Search Results for: "{searchTerm}"
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress sx={{ color: "#2e7d23" }} />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 3 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && products.length === 0 && (
          <Typography sx={{ mt: 3 }}>No products found.</Typography>
        )}

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
              <Card
                sx={{
                  width: 360,
                  height: 400,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  cursor: "pointer",
                  display: "flex",
                  outline: "1px solid black",
                  flexDirection: "column",
                }}
                onClick={() => navigate(`/product/${product.product_id}`)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={product.urlImage || product.image_url || "https://via.placeholder.com/360x240"}
                  alt={product.productName || product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#2e7d23" }}
                  >
                    {product.productName || product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock: {product.stockQuantity ?? product.stock_quantity}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchProduct;
