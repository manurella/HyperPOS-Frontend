import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { saveCategory, updateCategory, getCategories } from "../../API/APICategory";
import { Tags } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
  });

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      toast.error(errorMessage);
    }
  };

  const setCategoryToUpdate = (e) => {
    if (e.target.value === "New Category") {
      setFormData({
        id: undefined,
        name: "",
      });
      setIsUpdate(false);
      return;
    }
    const category = categories.find((c) => c.id == e.target.value);
    setFormData({
      id: category.id,
      name: category.name,
    });
    setIsUpdate(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    setIsLoading(true);
    try {
      if (isUpdate) {
        await updateCategory(formData?.id, formData);
        toast.success("Category updated successfully");
      } else {
        await saveCategory(formData);
        toast.success("Category saved successfully");
      }
      getAllCategory();
      setFormData({ id: undefined, name: "" });
      setIsUpdate(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">
          {isUpdate ? "Update Category" : "Add Category"}
        </h1>
        <p className="text-sm text-primary-800/60 mt-0.5">
          {isUpdate ? "Edit an existing product category" : "Create a new product category"}
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white border border-primary-100/20 rounded-xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-primary-100/10">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
            <Tags size={16} className="text-primary-600" />
          </div>
          <h2 className="text-sm font-semibold text-primary-800">Category Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* Select existing category */}
            <div>
              <label className="block text-xs font-semibold text-primary-800/60 uppercase tracking-wide mb-1.5">
                Select Category
              </label>
              <select
                name="id"
                onChange={setCategoryToUpdate}
                value={formData.id || "New Category"}
                className="pos-input"
              >
                <option value="New Category">New Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-primary-800/40 mt-1">Select an existing category to update, or leave as "New Category" to add.</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-primary-800/60 uppercase tracking-wide mb-1.5">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                required
                value={formData.name}
                onChange={handleChange}
                className="pos-input"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 bg-primary-50/20 border-t border-primary-100/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({ id: undefined, name: "" });
                setIsUpdate(false);
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
                isUpdate ? "Update Category" : "Add Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
