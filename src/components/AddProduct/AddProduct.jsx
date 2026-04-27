import { toast } from "react-hot-toast";
import React, { useState, useRef, useEffect } from "react";
import {
  saveProduct,
  saveProductImage,
  updateProduct,
  getProducts,
} from "../../API/APIProducts";
import { getCategories } from "../../API/APICategory";
import { PackagePlus, Upload, Barcode } from "lucide-react";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const unitList = [
    "KG", "GRAM", "MILLIGRAM", "LITRE", "MILLILITRE", "PIECE", "PACKET", "BAG", "BOX", "BOTTLE", "CAN", "BUNCH", "METER", "ROLL", "SET", "PAIR", "DOZEN", "CARTON", "SHEET", "TON", "GALLON", "BARREL", "CUBIC_METER", "YARD", "FOOT", "INCH", "SLAB", "REEL", "LOAF", "TUBE", "SACHET",
  ];

  const [form, setForm] = useState({
    id: undefined,
    barcode: "",
    name: "",
    unit: "",
    price: "",
    categoryId: "",
    discount: 0,
    description: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const barcodeRef = useRef(null);

  useEffect(() => {
    getCategoriesData();
    getAllProducts();
  }, []);

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const setProductToUpdate = (e) => {
    if (e.target.value === "New Product") {
      setForm({
        id: undefined,
        barcode: "",
        name: "",
        unit: "",
        price: "",
        categoryId: "",
        discount: 0,
        description: "",
        photo: null,
      });
      setLogoPreview(null);
      setIsUpdate(false);
      return;
    }
    const product = products.find((p) => p.id == e.target.value);
    setForm({
      id: product.id,
      barcode: product.barcode,
      name: product.name,
      unit: product.unit,
      price: product.price,
      categoryId: product.categoryId,
      discount: product.discount,
      description: product.description,
      photo: null,
    });
    setLogoPreview(null);
    setIsUpdate(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.barcode.trim()) newErrors.barcode = "Barcode is required";
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.unit) newErrors.unit = "Unit must be selected";
    if (!form.price || isNaN(form.price)) newErrors.price = "Valid price is required";
    if (!form.categoryId) newErrors.categoryId = "Please select a category";
    if (form.discount < 0) newErrors.discount = "Discount cannot be negative";
    if (form.discount > 100) newErrors.discount = "Discount cannot be more than 100%";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    setIsLoading(true);
    let pid = null;
    let image = form?.photo;
    
    try {
      if (isUpdate) {
        const response = await updateProduct(form?.id, form);
        pid = response?.id;
        toast.success("Product updated successfully!");
      } else {
        const response = await saveProduct(form);
        pid = response?.id;
        toast.success("Product added successfully!");
        setForm({
          id: undefined,
          barcode: "",
          name: "",
          unit: "",
          price: "",
          categoryId: "",
          discount: 0,
          description: "",
          photo: null,
        });
        setLogoPreview(null);
      }
      getAllProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
    
    // Handle image upload after adding/updating product
    if (pid && image) {
      try {
        await saveProductImage(pid, image);
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          {isUpdate ? "Update Product" : "Add Product"}
        </h1>
        <p className="text-sm text-zinc-600 mt-0.5">
          {isUpdate ? "Edit an existing product's details" : "Add a new product to the inventory"}
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <PackagePlus size={16} className="text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-700">Product Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* Select existing product */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Select Product (For update)
              </label>
              <select
                name="id"
                value={form.id || "New Product"}
                onChange={setProductToUpdate}
                className="pos-input"
              >
                <option value="New Product">New Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Barcode */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Barcode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="barcode"
                  placeholder="Scan or enter barcode"
                  ref={barcodeRef}
                  value={form.barcode}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className={`pos-input pl-10 ${errors.barcode ? 'border-red-400' : ''}`}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700/40">
                  <Barcode size={18} />
                </div>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-md border border-zinc-200 hover:bg-zinc-100 transition-colors"
                  onClick={() => barcodeRef.current?.focus()}
                >
                  Scan
                </button>
              </div>
              {errors.barcode && (
                <p className="text-xs text-red-500 mt-1">{errors.barcode}</p>
              )}
            </div>

            {/* Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  className={`pos-input ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className={`pos-input ${errors.categoryId ? 'border-red-400' : ''}`}
                >
                  <option value="">Choose the Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-xs text-red-500 mt-1">{errors.categoryId}</p>
                )}
              </div>
            </div>

            {/* Unit, Price & Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={`pos-input ${errors.unit ? 'border-red-400' : ''}`}
                >
                  <option value="">Select unit</option>
                  {unitList.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="text-xs text-red-500 mt-1">{errors.unit}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className={`pos-input ${errors.price ? 'border-red-400' : ''}`}
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  placeholder="0"
                  value={form.discount}
                  onChange={handleChange}
                  className={`pos-input ${errors.discount ? 'border-red-400' : ''}`}
                />
                {errors.discount && (
                  <p className="text-xs text-red-500 mt-1">{errors.discount}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="pos-input resize-none"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Product Image
              </label>
              <label className="flex items-center gap-3 w-full px-4 py-3 border border-zinc-200 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
                <Upload size={16} className="text-zinc-700/40 shrink-0" />
                <span className="text-sm text-zinc-600">
                  {form.photo ? form.photo.name : "Click to upload an image"}
                </span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>
              {logoPreview && (
                <div className="mt-3 flex items-center gap-4">
                  <div className="h-20 w-20 border border-zinc-200 rounded-xl flex items-center justify-center overflow-hidden bg-blue-50/20">
                    <img src={logoPreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-xs text-zinc-600">Image preview</p>
                </div>
              )}
              {errors.photo && (
                <p className="text-xs text-red-500 mt-1">{errors.photo}</p>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 bg-blue-50/20 border-t border-zinc-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setForm({
                  id: undefined,
                  barcode: "",
                  name: "",
                  unit: "",
                  price: "",
                  categoryId: "",
                  discount: 0,
                  description: "",
                  photo: null,
                });
                setLogoPreview(null);
                setIsUpdate(false);
                setErrors({});
              }}
              className="pos-btn-secondary"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="pos-btn-primary flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  {isUpdate ? "Updating..." : "Saving..."}
                </>
              ) : (
                isUpdate ? "Update Product" : "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
