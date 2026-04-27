import { toast } from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { saveCustomer, updateCustomer, getCustomers } from "../../API/APICustomer";
import { UserPlus } from "lucide-react";

const CustomerRegister = () => {
  const [customers, setCustomers] = useState([]);
  const [isUpdate,  setIsUpdate]  = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();

  const [formData, setFormData] = useState({ id: undefined, name: "", email: "", phone: "", address: "" });
  const [errors,   setErrors]   = useState({});

  useEffect(() => {
    getAllCustomers();
    nameRef.current?.focus();
  }, []);

  const getAllCustomers = async () => {
    try {
      setCustomers(await getCustomers());
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const setCustomerToUpdate = (e) => {
    if (e.target.value === "New Customer") {
      setFormData({ id: undefined, name: "", email: "", phone: "", address: "" });
      setIsUpdate(false);
      return;
    }
    const c = customers.find(c => c.id == e.target.value);
    setFormData({ id: c.id, name: c.name, email: c.email, phone: c.phone, address: c.address });
    setIsUpdate(true);
  };

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!formData.name.trim())    newErrors.name    = "Name is required";
    if (!formData.email.trim())   newErrors.email   = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim())   newErrors.phone   = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) submitForm();
  };

  const submitForm = async () => {
    setIsLoading(true);
    try {
      if (isUpdate) {
        await updateCustomer(formData?.id, formData);
        toast.success("Customer updated successfully");
      } else {
        await saveCustomer(formData);
        toast.success("Customer saved successfully");
      }
      getAllCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            {isUpdate ? "Update Customer" : "Register Customer"}
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            {isUpdate ? "Edit an existing customer's details" : "Add a new customer to the system"}
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <UserPlus size={16} className="text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-700">Customer Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                Select Customer
              </label>
              <select
                name="id"
                onChange={setCustomerToUpdate}
                value={formData.id || "New Customer"}
                className="pos-input"
              >
                <option value="New Customer">New Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="text-xs text-zinc-400 mt-1">Select an existing customer to update, or leave as "New Customer" to register.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="name" ref={nameRef}
                placeholder="Enter full name"
                value={formData.name} onChange={handleChange}
                className={`pos-input ${errors.name ? "border-red-400" : ""}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email"
                  placeholder="Enter email"
                  value={formData.email} onChange={handleChange}
                  className={`pos-input ${errors.email ? "border-red-400" : ""}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel" name="phone"
                  placeholder="10-digit phone number"
                  value={formData.phone} onChange={handleChange}
                  className={`pos-input ${errors.phone ? "border-red-400" : ""}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address" rows={3}
                placeholder="Enter customer address"
                value={formData.address} onChange={handleChange}
                className={`pos-input resize-none ${errors.address ? "border-red-400" : ""}`}
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>

          </div>

          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => { setFormData({ id: undefined, name: "", email: "", phone: "", address: "" }); setIsUpdate(false); setErrors({}); }}
              className="pos-btn-secondary"
            >
              Clear
            </button>
            <button type="submit" disabled={isLoading} className="pos-btn-primary">
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  {isUpdate ? "Updating..." : "Saving..."}
                </>
              ) : (isUpdate ? "Update Customer" : "Register Customer")}
            </button>
          </div>
        </form>
        </div>
    </div>
  );
};

export default CustomerRegister;
