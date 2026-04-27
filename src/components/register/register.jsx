import { toast } from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import {
  getSuppliers,
  saveSupplier,
  updateSupplier,
} from "../../API/APISupplier";
import { Truck } from "lucide-react";

const SupplierRegistration = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const setSupplierToUpdate = (e) => {
    if (e.target.value === "New Supplier") {
      setFormData({
        id: undefined,
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      setIsUpdate(false);
      return;
    }
    const supplier = suppliers.find(
      (supplier) => supplier.id == e.target.value
    );
    setFormData({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      email: supplier.email,
      phone: supplier.phone,
    });
    setIsUpdate(true);
  };

  const getAllSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitSupplier();
    }
  };

  const submitSupplier = async () => {
    setIsLoading(true);
    if (isUpdate) {
      try {
        const response = await updateSupplier(formData.id, formData);
        toast.error("Supplier updated: " + response?.name);
        getAllSuppliers();
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await saveSupplier(formData);
        toast.error("Supplier saved: " + response?.name);
        getAllSuppliers();
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          {isUpdate ? "Update Supplier" : "Register Supplier"}
        </h1>
        <p className="text-sm text-zinc-600 mt-0.5">
          {isUpdate ? "Edit an existing supplier's details" : "Add a new supplier to the system"}
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Truck size={16} className="text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-700">Supplier Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* Select / Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Select Supplier
                </label>
                <select
                  name="id"
                  value={formData.id || "New Supplier"}
                  onChange={setSupplierToUpdate}
                  className="pos-input"
                >
                  <option value="New Supplier">New Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Supplier Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter supplier name"
                  className={`pos-input ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                rows={3}
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter supplier address"
                className={`pos-input resize-none ${errors.address ? 'border-red-400' : ''}`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={`pos-input ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`pos-input ${errors.phone ? 'border-red-400' : ''}`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 bg-blue-50/20 border-t border-zinc-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({ id: undefined, name: "", address: "", email: "", phone: "" });
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
                isUpdate ? "Update Supplier" : "Register Supplier"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierRegistration;
