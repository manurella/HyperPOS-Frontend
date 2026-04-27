import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import CartTable from "./CartTable";
import Header from "./Header";
import SummaryFooter from "./SummaryFooter";
import Controls from "./Controls";
import { returnSale, getSaleById, getSale } from "../../API/APISale";
import { getProducts } from "../../API/APIProducts";
import InvoicePreview from "./InvoicePreview";

function InvoiceReturn() {
  const [invoiceData, setInvoiceData] = useState({});
  const [printInvoice, setPrintInvoice] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);

  const [productList, setProductList] = useState([
    {
      id: 1,
      barcode: "45646g08115f0",
      name: "new Laptop 57877gf",
      categoryId: 1,
      unit: "PIECE",
      description: null,
      image: null,
      discount: 0,
      price: 100,
      isActive: true,
    },
    {
      id: 2,
      barcode: "4fsidfdfsf",
      name: "phone 15",
      categoryId: 1,
      unit: "PIECE",
      description: "some description",
      image: null,
      discount: 5,
      price: 100000,
      isActive: true,
    },
  ]);

  useEffect(() => {
    getAllProducts();
  }, []);
  
  useEffect(() => {
    setCartItems(invoiceData?.items);
    setCash(invoiceData?.invoice?.total);
  }, [invoiceData]);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProductList(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error("Error :" + errorMessage);
      console.error("Error fetching products:", error);
    }
  };
  const selectInvoice = async (id) => {
    console.log("id", id);
    try {
      const response = await getSaleById(id);
      setInvoiceData(response);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error("Invoice Not Found: " + errorMessage);
      console.error("Error fetching invoice:", error);
      setInvoiceData({});
    }
  };

  const handleSubmitInvoice = async () => {
    if (cartItems?.length === 0) {
      toast.error("Please add items to the cart before submitting the invoice.");
      return;
    }
    console.log("invoice Items", cartItems);
    try {
      const invoiceForSubmit = setInvoiceForSubmit(
        invoiceData?.invoice,
        cartItems
      );
      console.log("invoiceForSubmit", invoiceForSubmit);
      const response = await returnSale(
        invoiceForSubmit.invoice.id,
        invoiceForSubmit
      );
      setPrintInvoice(response);
      toast.success("Invoice submitted successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error submitting invoice:", error);
    }
  };
  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: parseInt(quantity),
              amount:
                parseInt(quantity) * (item.price * (1 - item.discount / 100)) ||
                0,
            }
          : item
      )
    );
  };
  const setInvoiceForSubmit = (invoice, items) => {
    const newInvoice = {
      invoice: {
        id: invoice?.id,
        customerId: invoice?.customerId,
        total: items?.reduce((sum, item) => sum + item.amount, 0),
        paymentMethod: invoice?.paymentMethod,
      },
      items: items,
    };
    return newInvoice;
  };

  return (
    <div className="space-y-5">

        {/* Page title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">Invoice Return</h1>
          <p className="text-sm text-zinc-600 mt-1">Process and manage customer invoice returns</p>
        </div>

        <Header invoice={invoiceData?.invoice} selectInvoice={selectInvoice} />
        {printInvoice && (
          <div className="w-full flex justify-center">
            <InvoicePreview
              invoice={printInvoice}
              productList={productList}
              close={() => setPrintInvoice(null)}
            />
          </div>
        )}
        <CartTable
          cartItems={cartItems}
          productList={productList}
          onQuantityChange={handleQuantityChange}
        />
        <SummaryFooter
          cartItems={cartItems}
          cash={cash}
          setCash={setCash}
          change={change}
          setChange={setChange}
        />
        <Controls
          clear={() => setInvoiceData({})}
          onSubmitInvoice={handleSubmitInvoice}
        />
    </div>
  );
}
export default InvoiceReturn;
