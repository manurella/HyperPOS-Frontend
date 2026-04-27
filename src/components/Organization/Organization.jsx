import { useEffect, useState } from 'react';
import { getOrgInfo, updateOrgInfo } from '../../API/APIOrg';
import { Building2, Upload } from 'lucide-react';

function Organization() {
  const [orgData, setOrgData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: null,
    website: '',
    employeeCount: '',
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    handleLoadData();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!orgData.name) newErrors.name = 'Name is required';
    if (!orgData.address) newErrors.address = 'Address is required';
    if (!orgData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(orgData.phone))
      newErrors.phone = 'Please enter a valid phone number';
    if (!orgData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(orgData.email))
      newErrors.email = 'Please enter a valid email address';
    if (orgData.employeeCount === '')
      newErrors.employeeCount = 'Employee Count is required';
    else if (isNaN(orgData.employeeCount) || parseInt(orgData.employeeCount) < 0)
      newErrors.employeeCount = 'Please enter a valid number of employees';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setOrgData({ ...orgData, [name]: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setOrgData({
        ...orgData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    setSubmitSuccess(false);
    try {
      setIsSubmitting(true);
      setErrors({});
      if (validate()) {
        await updateOrgInfo(orgData);
        setSubmitSuccess(true);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit organization data' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadData = async () => {
    try {
      const response = await getOrgInfo();
      setOrgData({
        name: response.name,
        address: response.address,
        phone: response.phone,
        email: response.email,
        logo: null,
        website: response.website,
        employeeCount: response.employeeCount,
        isActive: response.isActive,
      });
      setLogoPreview(null);
      setSubmitSuccess(false);
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to load organization data' });
    }
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Organization Settings</h1>
        <p className="text-sm text-zinc-600 mt-0.5">Manage your organization profile and details</p>
      </div>

      {/* Alerts */}
      {submitSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
          Organization information saved successfully.
        </div>
      )}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-medium">
          {errors.submit}
        </div>
      )}

      {/* Form card */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building2 size={16} className="text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-700">Organization Profile</h2>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Org Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={orgData.name}
              onChange={handleChange}
              className={`pos-input ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
              placeholder="Enter organization name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={orgData.address}
              onChange={handleChange}
              className={`pos-input resize-none ${errors.address ? 'border-red-400 focus:ring-red-300' : ''}`}
              placeholder="Enter organization address"
              rows="3"
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={orgData.phone}
                onChange={handleChange}
                className={`pos-input ${errors.phone ? 'border-red-400 focus:ring-red-300' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={orgData.email}
                onChange={handleChange}
                className={`pos-input ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Website & Employee Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={orgData.website}
                onChange={handleChange}
                className="pos-input"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label htmlFor="employeeCount" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                Number of Employees <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="employeeCount"
                name="employeeCount"
                value={orgData.employeeCount}
                onChange={handleChange}
                min="0"
                className={`pos-input ${errors.employeeCount ? 'border-red-400 focus:ring-red-300' : ''}`}
                placeholder="0"
              />
              {errors.employeeCount && <p className="text-xs text-red-500 mt-1">{errors.employeeCount}</p>}
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Organization Logo
            </label>
            <label className="flex items-center gap-3 w-full px-4 py-3 border border-zinc-200 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
              <Upload size={16} className="text-zinc-700/40 shrink-0" />
              <span className="text-sm text-zinc-600">Click to upload an image</span>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleChange}
                accept="image/*"
                className="sr-only"
              />
            </label>
            {logoPreview && (
              <div className="mt-3 flex items-center gap-4">
                <div className="h-20 w-20 border border-zinc-200 rounded-xl flex items-center justify-center overflow-hidden bg-blue-50/20">
                  <img src={logoPreview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-xs text-zinc-600">Logo preview</p>
              </div>
            )}
            <p className="text-xs text-zinc-700/40 mt-1.5">Accepted: PNG, JPG, SVG. Recommended: square format.</p>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 py-3 px-4 bg-blue-50/20 rounded-xl border border-zinc-200">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={orgData.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-zinc-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <label htmlFor="isActive" className="text-sm font-medium text-zinc-700 cursor-pointer">
                Organization is Active
              </label>
              <p className="text-xs text-zinc-700/40 mt-0.5">Inactive organizations will be hidden from the system</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-blue-50/20 border-t border-zinc-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleLoadData}
            className="pos-btn-secondary"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="pos-btn-primary flex items-center gap-2"
          >
            {isSubmitting ? (
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
                Saving...
              </>
            ) : (
              'Save Organization'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Organization;
