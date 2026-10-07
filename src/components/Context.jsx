
"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db, paymentDb } from "@/firebaseConfig";
import {useRouter} from "next/navigation";
import { useCart } from "@/components/CartContext";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const { clearCart } = useCart();
  const [showSubscriptionReminder, setShowSubscriptionReminder] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const priceInNGN = { currency: "₦", amount: 100 };
  const priceInUSD = { currency: "$", amount: 2 };
const router = useRouter();
  const [paymentSession, setPaymentSession] = useState(false);

  // Load from localStorage only after client-side mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSession = localStorage.getItem("paymentSession");
      if (savedSession) {
        setPaymentSession(JSON.parse(savedSession));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("paymentSession", JSON.stringify(paymentSession));
    }
  }, [paymentSession]);




//after payment logic
  // async function finalizeOnlinePaymentOrder(paymentData, verificationNumber) {
  //   try {
  //     const storedOrder = localStorage.getItem('pendingOrder');
  //     if (!storedOrder) {
  //       console.warn("No pending order found in localStorage.");
  //       return;
  //     }

  //     const orderPayload = JSON.parse(storedOrder);

  //     orderPayload.paymentData = paymentData;
  //     orderPayload.paymentVerificationNumber = verificationNumber;

  //     const docRef = await addDoc(collection(db, "orders"), orderPayload);

  //     const buyerEmail = orderPayload.accountInfo?.email || '';
  //     // const sellerEmail = 'victorndu393@gmail.com';
  //     const sellerEmail = 'admin@kingswordcraft.com';

  //     await fetch('/api/send-order-email', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         orderId: docRef.id,
  //         payload: orderPayload,
  //         recipients: [buyerEmail, sellerEmail].filter(Boolean)
  //       })
  //     }).catch((err) => {
  //       console.error("Error triggering email notification:", err);
  //     });

  //     if (typeof clearCart === 'function') {
  //       clearCart();
  //     }
  //     localStorage.removeItem('selectedAddress');
  //     localStorage.removeItem('pendingOrder');

  //   } catch (error) {
  //     console.error("Error finalizing online payment order:", error);
  //     Swal.fire('Error', 'Failed to save your order. Please contact support.', 'error');
  //   throw error; // Re-throw so poller knows it failed if needed
  //   }
  // }



  async function finalizeOnlinePaymentOrder(paymentData, verificationNumber) {
  try {
    // 1. IDEMPOTENCY CHECK: Prevent duplicate orders if triggered multiple times
    const ordersRef = collection(db, "orders");
    const qCheck = query(ordersRef, where("paymentVerificationNumber", "==", verificationNumber));
    const existingOrders = await getDocs(qCheck);

    if (!existingOrders.empty) {
      console.warn("Order already finalized for verification number:", verificationNumber);
      return; // Stop here to prevent duplicate entries and duplicate emails
    }

    const storedOrder = localStorage.getItem('pendingOrder');
    if (!storedOrder) {
      console.warn("No pending order found in localStorage.");
      return;
    }

    const orderPayload = JSON.parse(storedOrder);

    orderPayload.paymentData = paymentData;
    orderPayload.paymentVerificationNumber = verificationNumber;

    // 2. Save order to Firestore first
    const docRef = await addDoc(collection(db, "orders"), orderPayload);

    const buyerEmail = orderPayload.accountInfo?.email || '';
    const sellerEmail = 'majinfotek@gmail.com';
    // const sellerEmail = 'victorndu393@gmail.com';

    // 3. ISOLATED EMAIL BLOCK: Ensure a failing email never blocks order cleanup
    try {
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: docRef.id,
          payload: orderPayload,
          recipients: [buyerEmail, sellerEmail].filter(Boolean)
        })
      });
    } catch (emailErr) {
      console.error("Error triggering email notification (non-fatal):", emailErr);
    }

    // 4. Guaranteed Cleanup (Runs regardless of email success/failure)
    if (typeof clearCart === 'function') {
      clearCart();
    }
    localStorage.removeItem('selectedAddress');
    localStorage.removeItem('pendingOrder');

  } catch (error) {
    console.error("Error finalizing online payment order:", error);
    Swal.fire('Error', 'Failed to save your order. Please contact support.', 'error');
    throw error; // Re-throw so poller knows it failed if needed
  }
}




  // ============================================
  // 🔁 Poll Firestore for Payment Verification
  // ============================================
  const startPaymentPolling1 = (verificationNumber) => {
    if (typeof window === "undefined") return;

    let email = null;
    try {
      const pending = localStorage.getItem("pendingTransaction");
      if (pending) {
        const parsed = JSON.parse(pending);
        email = parsed?.transaction?.email;
      }
    } catch (err) {
      console.error("Failed to parse email from pendingTransaction:", err);
    }

    if (!verificationNumber || !email) {
      console.warn("⚠️ Missing verification number or email for polling");
      return;
    }

    let pollingActive = true;
    let intervalId;

    const fetchPayment = async () => {
      if (!pollingActive) return;

      try {
        const paymentsRef = collection(paymentDb, "paystack_webhooks");
        const q = query(
          paymentsRef,
          where("data.customer.email", "==", email),
          where("data.metadata.custom_payment_verification_number", "==", verificationNumber)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const successfulDoc = snapshot.docs.find(
            (doc) => doc.data()?.data?.status === "success"
          );

          if (successfulDoc) {
            pollingActive = false;
            clearInterval(intervalId);

            const paymentData = successfulDoc.data();

            Swal.fire({
              text: "...Please wait...",
              allowOutsideClick: false,
            });
            Swal.showLoading();
      
            await finalizeOnlinePaymentOrder(paymentData, verificationNumber);
            localStorage.removeItem("pendingTransaction");
            setPaymentSession(false);
            
         Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Order successful. Navigating to your orders...",
              timer: 3000,
              showConfirmButton: false,
              allowOutsideClick:false
            }).then(() => {
              window.location.href = '/dashboard/myorders';
            });
             
          }
        }
      } catch (err) {
        console.error("🔥 Firestore polling error:", err);
      }
    };

    fetchPayment();
    intervalId = setInterval(fetchPayment, 10000);

    return () => {
      pollingActive = false;
      clearInterval(intervalId);
    };
  };

  const payWithPaystack = async (amount,currency,subaccountCode, email, name) => {
    // const email = auth.currentUser?.email;
    // const name = auth.currentUser?.displayName || "";
    // const nameParts = name.trim().split(/\s+/);
    // const firstName = nameParts[0] || "";
    // const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";


    console.log("Payment Details:", { email, name, amount, currency, subaccountCode });

    if (!email || !amount || !name || !currency) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide your name, email, currency, and a valid amount before proceeding with the payment.",
      });
      return;
    }


    const confirmation = await Swal.fire({
      title: "Start Payment",
      text: `You are about to start the payment process of ${currency} ${amount}. Do you wish to start Now?`,
      showCancelButton: true,
      confirmButtonText: "Start Now",
      cancelButtonText: "Cancel",
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    const verificationNumber = `${Date.now()}E${Math.floor(Math.random() * 1000000000)}`;
    const source = "Majinfotek Website";
    const purpose = "Purchase of Product";

    const initialTransaction = {
      status: "initialized",
      amount: amount,
      email,
      firstname: name,
      lastname: '',
      createdAt: new Date().toISOString(),
      paymentMethod: "Paystack",
      currency: currency,
      // subaccount: "ACCT_weypvhpue48sgcr",
    subaccount:subaccountCode,
      bearer: "subaccount",
      metadata: {
        custom_payment_verification_number: verificationNumber,
        source,
        purpose,
      },
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "pendingTransaction",
          JSON.stringify({ transaction: initialTransaction })
        );
      }
    } catch (err) {
      console.error("Failed to save pending transaction to localStorage:", err);
    }

    setPaymentSession(true);
    // Swal.fire({ text: "Please wait...", allowOutsideClick: false });
    // Swal.showLoading();

    // Dynamically import PaystackPop inside the client execution block only
    try {
      const PaystackPopModule = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPopModule();
      
      paystack.newTransaction({
        key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
        amount: amount * 100,
        email,
        firstname: name,
        lastname: '',
        // subaccount: "ACCT_weypvhpue48sgcr",
        subaccount:subaccountCode,
      bearer: "subaccount",
        metadata: {
          custom_payment_verification_number: verificationNumber,
          source,
          purpose,
        },
        onSuccess: () => {
          Swal.fire({ text: "Payment processing..., Please wait", showConfirmButton: false });
          Swal.showLoading();

          if (typeof startPaymentPolling1 === "function") {
            startPaymentPolling1(verificationNumber);
          }
        },
        onCancel: () => {
          setPaymentSession(false);
          if (typeof window !== "undefined") {
            localStorage.removeItem("pendingTransaction");
          }
          Swal.fire({ icon: "error", text: "Payment cancelled." });
        },
        onError: (error) => {
          setPaymentSession(false);
          if (typeof window !== "undefined") {
            localStorage.removeItem("pendingTransaction");
          }
          Swal.fire({ icon: "error", text: `Payment failed: ${error.message}` });
        },
      });
    } catch (error) {
      setPaymentSession(false);
      Swal.fire({ icon: "error", text: `Could not load Paystack: ${error.message}` });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedVerificationNumber = null;
    try {
      const pending = localStorage.getItem("pendingTransaction");
      if (pending) {
        const parsed = JSON.parse(pending);
        savedVerificationNumber = parsed?.transaction?.metadata?.custom_payment_verification_number;
      }
    } catch (err) {
      console.error("Failed to parse verification number from pendingTransaction:", err);
    }

    const stopPolling = startPaymentPolling1(savedVerificationNumber);

    return () => {
      if (stopPolling) stopPolling();
    };
  }, []);

  const value = useMemo(
    () => ({
      showSubscriptionReminder,
      setShowSubscriptionReminder,
      user,
      setUser,
      sidebarOpen,
      setSidebarOpen,
      theme,
      setTheme,
      priceInNGN,
      priceInUSD,
      paymentSession,
      setPaymentSession,
      payWithPaystack,
      startPaymentPolling1
    }),
    [showSubscriptionReminder, user, sidebarOpen, theme, paymentSession]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppContext() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useAppContext must be used within ContextProvider");
  }

  return context;
}