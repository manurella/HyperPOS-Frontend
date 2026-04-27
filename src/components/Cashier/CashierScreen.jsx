import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Header        from "./Header";
import ProductSearch from "./ProductSearch";
import CartTable     from "./CartTable";
import SummaryFooter from "./SummaryFooter";
import Controls      from "./Controls";
import InvoicePreview from "./InvoicePreview";

import { saveInvoice }  from "../../API/APIInvoice";
import { submitSale }   from "../../API/APISale";
import { getCustomers } from "../../API/APICustomer";

const CashierScreen = () => {
  const [cartItems,      setCartItems]      = useState([]);
  const [cash,           setCash]           = useState(0);
  const [change,         setChange]         = useState(0);
  const [customer,       setCustomer]       = useState(1);
  const [invoice,        setInvoice]        = useState({ customerId: 1, total: 0 });
  const [printInvoice,   setPrintInvoice]   = useState(null);
  const [productList,    setProductList]    = useState([]);
  const [customerList,   setCustomerList]   = useState([]);
  const [paymentMethod,  setPaymentMethod]  = useState("CASH");

  useEffect(() => {
    if (!invoice?.id) toast.error("Please create a new invoice first!");
    getCustomersList();
  }, []);

  const getCustomersList = async () => {
    try { setCustomerList(await getCustomers()); }
    catch (err) { console.error("Error fetching customers:", err); }
  };

  const getNewInvoice = async () => {
    try {
      const res = await saveInvoice({ customerId: 1, total: 0 });
      setInvoice(res);
    } catch (err) { console.error("Error saving invoice:", err); }
  };

  const handleAddToCart = (product) => {
    if (!invoice) { toast.error("Please create an invoice first!"); return; }
    const discountedPrice = product.unitPrice * (1 - product.discount / 100);
    setCartItems(prev => [...prev, {
      ...product,
      id: product.id || product.productId,
      amount: discountedPrice * product.quantity,
    }]);
  };

  const handleRemoveFromCart  = id => setCartItems(prev => prev.filter(i => i.id !== id));
  const handleQuantityChange  = (id, qty) =>
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: parseInt(qty) } : i));

  const handleNewInvoice = () => {
    getNewInvoice();
    setPrintInvoice(null);
    setCartItems([]);
    setCash("");
    setCustomer(1);
    setPaymentMethod("CASH");
  };

  const handleSubmitInvoice = () => {
    if (!cartItems.length) {
      toast.error("Please add items to the cart before submitting.");
      return;
    }
    const totalAmount = cartItems.reduce(
      (s, i) => s + i.unitPrice * i.quantity * (1 - i.discount / 100), 0
    );
    const invoiceData = {
      id: invoice.id, paymentMethod, customerId: customer,
      total: totalAmount, cash: parseFloat(cash),
      change: parseFloat(cash) - totalAmount,
    };
    const salesData = {
      invoice: invoiceData, items: cartItems,
      cash: parseFloat(cash), change: parseFloat(cash) - totalAmount,
    };
    (async () => {
      if (parseFloat(cash) < salesData.invoice.total) {
        toast.error("Cash is insufficient to cover the invoice total.");
        return;
      }
      try {
        const res = await submitSale(salesData);
        setPrintInvoice(res);
      } catch (err) {
        toast.error(err.response?.data?.message || err?.message);
      }
    })();
  };

  return (
    <div className="space-y-5">

        {/* Page title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">Point of Sale</h1>
          <p className="text-sm text-zinc-600 mt-1">Create and process customer invoices</p>
        </div>

        {/* Invoice preview overlay */}
        {printInvoice && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4">
            <InvoicePreview
              invoice={printInvoice}
              productList={productList}
              setPrintInvoice={setPrintInvoice}
              close={handleNewInvoice}
            />
          </div>
        )}

        <Header
          customers={customerList}
          invoice={invoice}
          setCustomer={setCustomer}
        />

        <ProductSearch
          onAdd={handleAddToCart}
          invoice={invoice}
          setProductList={setProductList}
        />

        <CartTable
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
        />

        <SummaryFooter
          cartItems={cartItems}
          cash={cash}
          setCash={setCash}
          customer={customer}
          setCustomer={setCustomer}
          change={change}
          setChange={setChange}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <Controls
          onNewInvoice={handleNewInvoice}
          onSubmitInvoice={handleSubmitInvoice}
          invoice={invoice}
        />
    </div>
  );
};

export default CashierScreen;
