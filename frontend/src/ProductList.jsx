import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductList() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  const filterProducts = () => {
    let tempProducts = products;

    if (searchInput) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.id.toString().includes(searchInput) ||
        product.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (currentCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.category === currentCategory
      );
    }

    setFilteredProducts(tempProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchInput, currentCategory, products]);

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="container my-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> {error}
          </div>
        )}

        <h2 className="mb-4">Search for Products</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mb-4"
        >
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <label htmlFor="searchInput" className="form-label">
                Search
              </label>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
            </div>
          </div>
        </form>

        <h3 className="my-3">Products</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Product product={product} key={index} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
