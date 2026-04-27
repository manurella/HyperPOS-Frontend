import { useState, useEffect } from 'react';
import Header from './Header'
import CartTable from './CartTable';
import Controls from './Controls';
import SummeryFooter from './SummeryFooter';
import { getPurchases, getPurchaseById, savePurchase, returnPurchase } from '../../API/APIPurchase';
import {getProducts} from '../../API/APIProducts';
import GRNPreview from './GRNPreview';


import { toast } from "react-hot-toast";
function GrnReturn() {
    const [grnData, setGRNData] = useState({});
    const [printGRN, setPrintGRN] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [productList, setProductList] = useState([]);

    useEffect(()=> {
        const getAllProducts = async () => {
            try {
                const response = await getProducts();
                setProductList(response);
            }
            catch (error){
                const errorMessage = error.response?.data?.message || "An error occurred";
                toast.error("Error: "+ errorMessage);
                console.error("Error fetching products: ", error);
            }
        };
        getAllProducts();
    },[]);

    useEffect(() => {
        setCartItems(grnData?.items);
        setTotalAmount(grnData?.grn?.total || 0);
    }, [grnData]);

    const selectGRN = async (id) => {
        console.log("GRN ID: ", id);
        try {
            const response = await getPurchaseById(id);
            setGRNData(response);
            console.log("GRN Data: ", response);
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error("GRN not found: "+ errorMessage);
            console.error("Error fetching GRN: ", error);
            setGRNData({});
        }
    };

    const handleSubmitGRN = async () => {
        if(cartItems?.length === 0){
            toast.error("Please select at least one item to return");
            return;
        }
        try{
            const grnForSubmit = setGRNForSubmit(grnData?.grn, cartItems);
            console.log("GRN for submit: ", grnForSubmit);
            const response = await returnPurchase(grnForSubmit.grn.id, grnForSubmit);
            setPrintGRN(response);
            toast.success("GRN return submitted successfully");
        }
        catch (error){
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            console.error("Error submitting GRN return: ", error);
        }
    };

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prev) => 
            prev.map((item) =>
                item.id === id ? { ...item,
                    quantity: parseInt(quantity),
                    amount:
                        parseInt(quantity) * (item.unitCost * (1 - item.discount / 100))
                        || 0,
                 }
                 : item
            )
        );
    };

    const setGRNForSubmit = (grn , items) => {
        const newGRN = {
            grn: {
                id: grn?.id,
                supplierId: grn?.supplierId,
                total: items?.reduce((sum, item) => sum + item.amount, 0),
                remarks: remarks,
            },
            items: items,
        };
        return newGRN;
    };

    return (
        <div className="space-y-5">

            {/* Page title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">Return Purchase / GRN</h1>
              <p className="text-sm text-zinc-600 mt-1">Process purchase returns and manage GRN adjustments</p>
            </div>

            <Header grn={grnData?.grn} selectGRN={selectGRN} />

                {printGRN && (
                    <div className="w-full flex justify-center">
                        <GRNPreview grn={printGRN} productList={productList} close={() => setPrintGRN(null)} />
                    </div>
                )}

                <CartTable
                    cartItems={cartItems}
                    productList={productList}
                    onQuantityChange={handleQuantityChange}
                />

                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Remarks</label>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="pos-input resize-none"
                        rows="3"
                        placeholder="Enter any notes or remarks here"
                    />
                </div>

                <SummeryFooter
                    cartItems={cartItems}
                    totalAmount={totalAmount}
                />
                
                <Controls
                    clear={()=> {
                        setGRNData({});
                        setRemarks("");
                    }}
                    onSubmitGRN={handleSubmitGRN}
                />
        </div>
    );
}
export default GrnReturn;
