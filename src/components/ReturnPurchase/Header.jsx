import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ grn, selectGRN }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        if (searchValue.trim() !== "") {
            selectGRN(searchValue.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Return GRN</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                {/* Search */}
                <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
                        Search For GRN By ID
                    </label>
                    <div className="flex">
                        <input
                            type="number"
                            name="search"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Press Enter or click search"
                            onKeyDown={handleKeyDown}
                            className="pos-input rounded-r-none"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="pos-btn-primary rounded-l-none px-4 flex items-center justify-center"
                            tabIndex={-1}
                        >
                            <IoSearchSharp className="text-lg" />
                        </button>
                    </div>
                </div>
                {/* GRN Info */}
                <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">GRN ID</label>
                    <input
                        type="text"
                        value={grn?.id || ""}
                        readOnly
                        className="pos-input bg-blue-50/20"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Supplier ID</label>
                    <input
                        type="text"
                        value={grn?.supplierId || ""}
                        readOnly
                        className="pos-input bg-blue-50/20"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
