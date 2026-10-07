


// 'use client'
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useRouter } from 'next/navigation';
// import { auth, db } from '@/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// // import { doc, getDoc, getDocs , serverTimestamp, addDoc, collection,} from 'firebase/firestore';
// import { doc, getDoc, getDocs, serverTimestamp, addDoc, collection, query, where } from 'firebase/firestore';
// import { useCart } from '@/components/CartContext'; // Import your Cart Context
// import Swal from 'sweetalert2';
// import { useAppContext } from '@/components/Context';

// export default function OrderSummaryPage() {
//   const router = useRouter();
//   const { cart, cartSubtotal, clearCart } = useCart(); // Consume from Cart Context


// // console.log(cart)


//   // State
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [deliveryAddress, setDeliveryAddress] = useState(null);
//   const [deliveryFee, setDeliveryFee] = useState(0); // Default placeholder fee (₦5,000)

//   // Promo code state
//   const [promoCode, setPromoCode] = useState('');
//   const [promoCodeInput, setPromoCodeInput] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [appliedPromo, setAppliedPromo] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {payWithPaystack} = useAppContext();

//   // Auth Loader
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setCurrentUser(user);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);
//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setCurrentUser(null);
//         setUserData(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Load Delivery Address from localStorage
//   useEffect(() => {
//     try {
//       const storedAddress = localStorage.getItem('selectedAddress');
//       if (storedAddress) {
//         setDeliveryAddress(JSON.parse(storedAddress));
//       }
//     } catch (error) {
//       console.error("Error reading selectedAddress from localStorage:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Calculations using cartSubtotal from context
//   const finalTotal = Math.max(0, cartSubtotal + deliveryFee - discount);


//   // 🌟 Dynamic Promo Code Handler (Connected to Firestore 'promoCodes')
// const handleApplyPromo = async (e) => {
//   e.preventDefault();
//   if (!promoCodeInput.trim()) return;

//   try {
//     const codeFormatted = promoCodeInput.trim().toUpperCase();
//     const q = query(collection(db, "promoCodes"), where("code", "==", codeFormatted));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       Swal.fire('Invalid Code', 'The promo code entered does not exist or has expired.', 'error');
//       return;
//     }

//     const promoData = querySnapshot.docs[0].data();
//     let calculatedDiscount = 0;

//     if (promoData.discountType === 'percentage') {
//       calculatedDiscount = (cartSubtotal * promoData.discountValue) / 100;
//     } else {
//       calculatedDiscount = promoData.discountValue;
//     }

//     setDiscount(calculatedDiscount);
//     setAppliedPromo(`${promoData.code} (${promoData.discountType === 'percentage' ? `${promoData.discountValue}%` : `₦${promoData.discountValue.toLocaleString()}`} Off)`);
    
//     Swal.fire('Success!', `Promo code "${promoData.code}" applied successfully!`, 'success');
//     setPromoCodeInput('');
//   } catch (error) {
//     console.error("Error applying promo code:", error);
//     Swal.fire('Error', 'Could not apply promo code. Please try again.', 'error');
//   }
// };

// const handleRemovePromo = () => {
//   setDiscount(0);
//   setAppliedPromo(null);
//   Swal.fire('Removed', 'Promo code has been removed.', 'info');
// };


// const handlePayNow = async () => {
//     if (!deliveryAddress) {
//       Swal.fire('Missing Address', 'Please select a delivery address before proceeding.', 'warning');
//       router.push('/addresses');
//       return;
//     }

//     if (cart.length === 0) {
//       Swal.fire('Empty Cart', 'Your cart is empty.', 'warning');
//       return;
//     }

//     try {
//       // 1. Fetch the global subaccount from Firestore
//       const querySnapshot = await getDocs(collection(db, "subaccounts"));
      
//       if (querySnapshot.empty) {
//         Swal.fire('Payout Account Missing', 'The seller has not added a payout account yet. Please try again later.', 'warning');
//         return; // Do not proceed
//       }

//       // Get the first available subaccount document data
//       const subaccountData = querySnapshot.docs[0].data();
//       const subaccountCode = subaccountData.subaccount_code;

//       if (!subaccountCode) {
//         Swal.fire('Invalid Payout Setup', 'The seller payout account configuration is invalid.', 'error');
//         return;
//       }

//       const uniqueOrderNumber = `ORDER-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

//       const orderPayload = {
//         orderNumber: uniqueOrderNumber,
//         userId: currentUser ? currentUser.uid : 'guest',
//         items: cart,
//         deliveryAddress,
//         subtotal: cartSubtotal,
//         deliveryFee,
//         discount,
//         finalTotal,
//         promoCode: appliedPromo,
//         currency: 'NGN',
//         accountInfo: {
//           name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
//           email: currentUser?.email,
//           phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
//         },
//         paymentType: 'ONLINE PAYMENT',
//         paymentStatus: 'Paid',
//         orderStatus: 'Pending',
//         createdAt: serverTimestamp()
//       };

//       localStorage.setItem('pendingOrder', JSON.stringify(orderPayload));

//       // 2. Pass the subaccount code to your Paystack function
//       payWithPaystack(finalTotal, 'NGN', subaccountCode);

//     } catch (error) {
//       console.error("Error fetching subaccount:", error);
//       Swal.fire('Error', 'Could not verify the seller payout account. Please try again.', 'error');
//     }
//   };


// // Pay on Delivery Handler with Swal Confirmation & Bulletproof Safeguards
//   const handlePayOnDelivery = async () => {
//     if (!deliveryAddress) {
//       Swal.fire('Missing Address', 'Please select a delivery address before proceeding.', 'warning');
//       router.push('/dashboard/addressmanager');
//       return;
//     }

//     if (cart.length === 0) {
//       Swal.fire('Empty Cart', 'Your cart is empty.', 'warning');
//       return;
//     }

//     // Prevent double execution if already submitting
//     if (setIsSubmitting && typeof setIsSubmitting === 'function') {
//       // (Optional check depending on your state, but good practice)
//     }

//     // Confirmation Modal
//     const confirmResult = await Swal.fire({
//       title: 'Confirm Pay on Delivery',
//       text: `Are you sure you want to place this order with Pay on Delivery? Total: ₦${finalTotal.toLocaleString()}`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#2563eb',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Place Order'
//     });

//     if (!confirmResult.isConfirmed) {
//       return; // Exit if user cancels
//     }

//     setIsSubmitting(true);
//     Swal.fire({
//       title: 'Processing Order...',
//       text: 'Please wait while we process your order.',
//       allowOutsideClick: false,
//       showConfirmButton: false
//     });
//     Swal.showLoading();

//     try {
//       const buyerEmail = currentUser?.email || userData?.email || '';
//       // const sellerEmail = 'victorndu393@gmail.com';
//       const sellerEmail = 'enitzglobal@gmail.com';
//       const uniqueOrderNumber = `ORDER-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

//       // 1. SAFETY CHECK: Ensure order number doesn't somehow collide
//       const ordersRef = collection(db, "orders");
//       const qCheck = query(ordersRef, where("orderNumber", "==", uniqueOrderNumber));
//       const existingCheck = await getDocs(qCheck);
      
//       if (!existingCheck.empty) {
//         throw new Error("Order number collision detected. Please try again.");
//       }

//       const orderPayload = {
//         orderNumber: uniqueOrderNumber,
//         userId: currentUser ? currentUser.uid : 'guest',
//         items: cart,
//         deliveryAddress,
//         subtotal: cartSubtotal,
//         deliveryFee,
//         discount,
//         finalTotal,
//         promoCode: appliedPromo,
//         currency: 'NGN',
//         accountInfo: {
//           name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
//           email: buyerEmail,
//           phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
//         },
//         paymentType: 'PAYMENT ON DELIVERY',
//         paymentStatus: 'Pending',
//         orderStatus: 'Pending',
//         createdAt: serverTimestamp()
//       };

//       // 2. Save complete order payload to Firestore under "orders" collection
//       const docRef = await addDoc(collection(db, "orders"), orderPayload);

//       // 3. ISOLATED EMAIL BLOCK: Ensure email failure never stops order completion or cart clearing
//       try {
//         // Create a clean email payload object (replacing serverTimestamp with an ISO string for safety)
//         const emailPayload = {
//           ...orderPayload,
//           createdAt: new Date().toISOString()
//         };

//         await fetch('/api/send-order-email', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             orderId: docRef.id,
//             payload: emailPayload,
//             recipients: [buyerEmail, sellerEmail].filter(Boolean)
//           })
//         });
//       } catch (emailErr) {
//         console.error("Error triggering email notification (non-fatal):", emailErr);
//       }

//       // 4. Guaranteed Cleanup (Runs regardless of email success/failure)
//       if (typeof clearCart === 'function') {
//         clearCart();
//       }
//       localStorage.removeItem('selectedAddress');
//       localStorage.removeItem('pendingOrder');

//       await Swal.fire({
//         title: 'Order Placed Successfully!',
//         text: 'Your Pay on Delivery order has been placed. We have sent confirmation details to your email.',
//         icon: 'success',
//         confirmButtonText: 'View Orders'
//       });

//       router.push('/dashboard/myorders');

//     } catch (error) {
//       console.error("Error processing Pay on Delivery order:", error);
//       Swal.fire('Error', error.message || 'Failed to place your order. Please try again.', 'error');
//     } finally {
//       setIsSubmitting(false);
//       Swal.close(); // Close the loading modal safely
//     }
//   };





  

//   if (loading) {
//     return <LoadingText>Loading Order Summary...</LoadingText>;
//   }

//   return (
//     <Container>
//       <PageTitle>Order Summary</PageTitle>

//       <LayoutGrid>
//         {/* Left Column: Details & Cart */}
//         <MainContent>
//           {/* Account Information */}
//           <Card>
//             <CardHeader>
//               <h3>Account Information</h3>
//             </CardHeader>
//             <CardBody>
//               {currentUser ? (
//                 <InfoGrid>
//                   <div>
//                     <Label>Name</Label>
//                     <Value>{userData?.fullName || currentUser.displayName || 'Valued Customer'}</Value>
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Value>{currentUser.email}</Value>
//                   </div>
//                   <div>
//                     <Label>Phone</Label>
//                     <Value>{userData?.phone || currentUser.phoneNumber || 'Not provided'}</Value>
//                   </div>
//                 </InfoGrid>
//               ) : (
//                 <WarningText>Please log in to view account details.</WarningText>
//               )}
//             </CardBody>
//           </Card>

//           {/* Delivery Address */}
//           <Card>
//             <CardHeader>
//               <h3>Delivery Address</h3>
//               <TextButton onClick={() => router.push('/dashboard/addressmanager')}>Change / Select</TextButton>
//             </CardHeader>
//             <CardBody>
//               {deliveryAddress ? (
//                 <div>
//                   <AddressName>{deliveryAddress.fullName}</AddressName>
//                   <AddressText>{deliveryAddress.street}</AddressText>
//                   <AddressText>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}</AddressText>
//                   <AddressText>{deliveryAddress.country}</AddressText>
//                   <AddressText>Phone: {deliveryAddress.phone}</AddressText>
//                 </div>
//               ) : (
//                 <EmptyStateBox>
//                   <WarningText>No delivery address selected.</WarningText>
//                   <ActionButton onClick={() => router.push('/addresses')}>Select Address</ActionButton>
//                 </EmptyStateBox>
//               )}
//             </CardBody>
//           </Card>

//           {/* Cart Items from Context */}
//           <Card>
//             <CardHeader>
//               <h3>Cart Items ({cart.length}) <span>(◀ Scroll▶)</span></h3>
//             </CardHeader>
//             <CardBody style={{ padding: 0 }}>
//               {cart.length === 0 ? (
//                 <EmptyCartText>Your cart is empty.</EmptyCartText>
//               ) : (
//                 <TableResponsiveWrapper>
//                   <CartTable>
//                     <thead>
//                       <tr>
//                         <th>Item</th>

//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>

// {cart.map((item, index) => {
//   const itemPrice = Number(item.price || item.amount || 0);
//   const itemTotal = itemPrice * Number(item.quantity || 1);
//   return (
//     <tr key={`${item.id}-${JSON.stringify(item.variations || {})}-${index}`}>
//       <td>
//         <ItemInfo>
//           {item.image && <ItemImg src={item.image} alt={item.name || item.title} />}
//           <div>
//             <ItemName>{item.name || item.title}</ItemName>
            
//             {/* 🌟 Display Variations cleanly in Order Summary */}
//             {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
//                 {Object.entries(item.variations).map(([key, value]) => (
//                   <span 
//                     key={key} 
//                     style={{ 
//                       fontSize: "0.65rem", 
//                       color: "#475569", 
//                       background: "#f1f5f9", 
//                       padding: "1px 5px", 
//                       borderRadius: "4px", 
//                       fontWeight: "600", 
//                       textTransform: "capitalize" 
//                     }}
//                   >
//                     {key}: <strong style={{ color: "#0f172a" }}>{String(value)}</strong>
//                   </span>
//                 ))}
//               </div>
//             )}

//             <p style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '2px' }}>ID: {item.id}</p>
//           </div>
//         </ItemInfo>
//       </td>

//       <td>₦{itemPrice.toLocaleString()}</td>
//       <td>{item.quantity}</td>
//       <td>₦{itemTotal.toLocaleString()}</td>
//     </tr>
//   );
// })}
//                     </tbody>
//                   </CartTable>
//                 </TableResponsiveWrapper>
//               )}
//             </CardBody>
//           </Card>
//         </MainContent>

//         {/* Right Column: Pricing & Checkout */}
//         <Sidebar>
         
// <SummaryCard>
//   <h3>Order Totals</h3>
  
//   <SummaryRow>
//     <span>Subtotal</span>
//     <span>₦{cartSubtotal.toLocaleString()}</span>
//   </SummaryRow>

//   <SummaryRow>
//     <span>Delivery Fee</span>
//     <span>₦{deliveryFee.toLocaleString()}</span>
//   </SummaryRow>

//   {/* Only show discount row if active */}
//   {discount > 0 && (
//     <SummaryRow discount>
//       <span>Discount ({appliedPromo})</span>
//       <span>-₦{discount.toLocaleString()}</span>
//     </SummaryRow>
//   )}

//   <Divider />

//   <TotalRow>
//     <span>Final Total</span>
//     <span>₦{Math.max(0, cartSubtotal + deliveryFee - discount).toLocaleString()}</span>
//   </TotalRow>

//   {/* Promo Code Input Form or Applied Badge */}
//   {!appliedPromo ? (
//     <PromoForm onSubmit={handleApplyPromo}>
//       <PromoInput 
//         type="text" 
//         placeholder="Enter promo code" 
//         value={promoCodeInput}
//         onChange={(e) => setPromoCodeInput(e.target.value)}
//       />
//       <ApplyButton type="submit">Apply</ApplyButton>
//     </PromoForm>
//   ) : (
//     <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 12px", borderRadius: "6px" }}>
//       <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "600" }}>🎟️ {appliedPromo}</span>
//       <TextButton type="button" onClick={handleRemovePromo} style={{ color: "#dc2626" }}>Remove</TextButton>
//     </div>
//   )}

//     <PayNowButton onClick={handlePayNow} disabled={cart.length === 0 || !deliveryAddress}>
//               PAY NOW (₦{finalTotal.toLocaleString()})
//             </PayNowButton>
//             <PayOnDeliveryButton onClick={handlePayOnDelivery} disabled={cart.length === 0 || !deliveryAddress || isSubmitting}>
//               {isSubmitting ? 'Processing Order...' : 'PAY ON DELIVERY'}
//             </PayOnDeliveryButton>
// </SummaryCard>
          
//         </Sidebar>
//       </LayoutGrid>
//     </Container>
//   );
// }



// // --- Styled Components (Theme Colors: PrimaryNavy #0B1B48, PrimaryCyan #00AEEF, Gradient) ---

// const PrimaryNavy = "#0B1B48";
// const PrimaryCyan = "#00AEEF";
// const Dark = "#0f172a";
// const Border = "#cbd5e1";
// const White = "#ffffff";
// const TextMuted = "#475569";
// const LightBg = "#f8fafc";
// const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 20px auto;
//   padding: 0 10px;
//   box-sizing: border-box;
//   color: ${Dark};
//   width: 100%;
//   overflow-x: hidden;

//   @media (min-width: 768px) {
//     margin: 40px auto;
//     padding: 0 20px;
//   }
// `;

// const PageTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 800;
//   margin-bottom: 16px;
//   border-bottom: 2px solid ${PrimaryCyan};
//   padding-bottom: 8px;
//   color: ${PrimaryNavy};

//   @media (min-width: 768px) {
//     font-size: 2rem;
//     margin-bottom: 24px;
//     padding-bottom: 12px;
//   }
// `;

// const LayoutGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 16px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (min-width: 900px) {
//     grid-template-columns: 1fr 380px;
//     gap: 24px;
//   }
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   min-width: 0; /* Prevents grid items from overflowing */

//   @media (min-width: 768px) {
//     gap: 20px;
//   }
// `;

// const Sidebar = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-width: 0;
// `;

// const Card = styled.div`
//   background: ${White};
//   border: 1px solid ${Border};
//   border-top: 4px solid ${PrimaryCyan};
//   border-radius: 8px;
//   box-shadow: 0 2px 6px rgba(11, 27, 72, 0.04);
//   overflow: hidden;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const CardHeader = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   gap: 8px;
//   padding: 12px 14px;
//   background: ${LightBg};
//   border-bottom: 1px solid ${Border};

//   h3 {
//     margin: 0;
//     font-size: 1rem;
//     color: ${PrimaryNavy};
//     font-weight: 700;
//   }

//   span {
//     display: none;
//     font-size: 0.75rem;
//     @media (max-width: 480px) {
//       display: inline;
//     }
//   }

//   @media (min-width: 768px) {
//     padding: 16px 20px;
//     h3 {
//       font-size: 1.1rem;
//     }
//   }
// `;

// const CardBody = styled.div`
//   padding: 14px;
//   box-sizing: border-box;
//   width: 100%;

//   @media (min-width: 768px) {
//     padding: 20px;
//   }
// `;

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 12px;

//   @media (min-width: 480px) {
//     grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//     gap: 16px;
//   }
// `;

// const Label = styled.span`
//   display: block;
//   font-size: 0.75rem;
//   color: ${TextMuted};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   margin-bottom: 2px;
// `;

// const Value = styled.span`
//   font-size: 0.9rem;
//   color: ${Dark};
//   font-weight: 600;
//   word-break: break-word;
// `;

// const AddressName = styled.h4`
//   margin: 0 0 4px 0;
//   font-size: 1rem;
//   color: ${PrimaryNavy};
//   font-weight: 700;
// `;

// const AddressText = styled.p`
//   margin: 2px 0;
//   font-size: 0.85rem;
//   color: ${TextMuted};
//   word-break: break-word;
// `;

// const TextButton = styled.button`
//   background: transparent;
//   color: ${PrimaryNavy};
//   border: none;
//   font-size: 0.8rem;
//   font-weight: 600;
//   cursor: pointer;
//   padding: 0;
//   &:hover {
//     text-decoration: underline;
//     color: ${PrimaryCyan};
//   }
// `;

// const ActionButton = styled.button`
//   background: ${PrimaryNavy};
//   color: ${White};
//   border: 1px solid ${PrimaryCyan};
//   padding: 8px 16px;
//   border-radius: 6px;
//   font-weight: 600;
//   font-size: 0.9rem;
//   cursor: pointer;
//   &:hover {
//     background: ${PrimaryCyan};
//     color: ${White};
//   }
// `;

// const EmptyStateBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 12px;
// `;

// const WarningText = styled.p`
//   color: ${TextMuted};
//   font-size: 0.9rem;
//   margin: 0;
//   word-break: break-word;
// `;

// const EmptyCartText = styled.p`
//   padding: 20px;
//   text-align: center;
//   color: ${TextMuted};
//   margin: 0;
// `;

// const TableResponsiveWrapper = styled.div`
//   width: 100%;
//   overflow-x: auto;
//   -webkit-overflow-scrolling: touch;
// `;

// const CartTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   text-align: left;
//   font-size: 0.85rem;
//   min-width: 280px;

//   th {
//     background: ${LightBg};
//     color: ${Dark};
//     padding: 10px 12px;
//     font-weight: 600;
//     border-bottom: 1px solid ${Border};
//     white-space: nowrap;
//   }

//   td {
//     padding: 10px 12px;
//     border-bottom: 1px solid ${Border};
//     color: ${TextMuted};
//     vertical-align: middle;
//     white-space: nowrap;
//   }

//   @media (min-width: 768px) {
//     font-size: 0.9rem;
//     th, td {
//       padding: 12px 16px;
//     }
//   }
// `;

// const ItemInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const ItemImg = styled.img`
//   width: 40px;
//   height: 40px;
//   object-fit: cover;
//   border-radius: 6px;
//   border: 1px solid ${Border};
//   flex-shrink: 0;

//   @media (min-width: 768px) {
//     width: 50px;
//     height: 50px;
//   }
// `;

// const ItemName = styled.span`
//   font-weight: 600;
//   color: ${Dark};
//   display: block;
//   max-width: 140px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;

//   @media (min-width: 768px) {
//     max-width: none;
//     white-space: normal;
//   }
// `;

// const SummaryCard = styled.div`
//   background: ${White};
//   border: 1px solid ${PrimaryCyan};
//   border-radius: 8px;
//   padding: 16px;
//   box-shadow: 0 4px 12px rgba(11, 27, 72, 0.06);
//   width: 100%;
//   box-sizing: border-box;

//   @media (min-width: 900px) {
//     position: sticky;
//     top: 20px;
//     padding: 24px;
//   }

//   h3 {
//     margin-top: 0;
//     margin-bottom: 16px;
//     font-size: 1.1rem;
//     color: ${PrimaryNavy};
//     font-weight: 700;
//     border-bottom: 2px solid ${LightBg};
//     padding-bottom: 8px;

//     @media (min-width: 768px) {
//       font-size: 1.2rem;
//       margin-bottom: 20px;
//       padding-bottom: 10px;
//     }
//   }
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 10px;
//   font-size: 0.9rem;
//   color: ${props => (props.discount ? '#2e7d32' : TextMuted)};
//   font-weight: ${props => (props.discount ? '600' : '400')};

//   @media (min-width: 768px) {
//     font-size: 0.95rem;
//     margin-bottom: 12px;
//   }
// `;

// const Divider = styled.hr`
//   border: none;
//   border-top: 1px solid ${Border};
//   margin: 12px 0;

//   @media (min-width: 768px) {
//     margin: 16px 0;
//   }
// `;

// const TotalRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 1.1rem;
//   font-weight: 800;
//   color: ${PrimaryNavy};
//   margin-bottom: 16px;

//   @media (min-width: 768px) {
//     font-size: 1.2rem;
//     margin-bottom: 20px;
//   }
// `;

// const PromoForm = styled.form`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 16px;

//   @media (min-width: 768px) {
//     margin-bottom: 20px;
//   }
// `;

// const PromoInput = styled.input`
//   flex: 1;
//   min-width: 0;
//   padding: 10px 12px;
//   border: 1px solid ${Border};
//   border-radius: 6px;
//   font-size: 0.9rem;
//   &:focus {
//     outline: none;
//     border-color: ${PrimaryCyan};
//   }
// `;

// const ApplyButton = styled.button`
//   background: ${Dark};
//   color: ${White};
//   border: none;
//   padding: 0 14px;
//   border-radius: 6px;
//   font-weight: 600;
//   font-size: 0.85rem;
//   cursor: pointer;
//   white-space: nowrap;
//   &:hover {
//     background: ${PrimaryNavy};
//   }
// `;

// const PayNowButton = styled.button`
//   width: 100%;
//   background: ${ThemeGradient};
//   color: ${White};
//   border: none;
//   padding: 12px;
//   border-radius: 6px;
//   font-size: 0.95rem;
//   font-weight: 800;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-sizing: border-box;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-1px);
//   }
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   @media (min-width: 768px) {
//     padding: 14px;
//     font-size: 1rem;
//   }
// `;

// const LoadingText = styled.p`
//   text-align: center;
//   padding: 60px;
//   font-size: 1.1rem;
//   color: ${PrimaryNavy};
//   font-weight: 600;
// `;

// const PayOnDeliveryButton = styled.button`
//   width: 100%;
//   background: ${White};
//   color: ${PrimaryNavy};
//   border: 2px solid ${PrimaryNavy};
//   padding: 12px;
//   border-radius: 6px;
//   font-size: 0.95rem;
//   font-weight: 800;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   margin-top: 10px;
//   transition: all 0.3s ease;
//   box-sizing: border-box;

//   &:hover {
//     background: ${PrimaryNavy};
//     color: ${White};
//   }
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   @media (min-width: 768px) {
//     padding: 14px;
//     font-size: 1rem;
//     margin-top: 12px;
//   }
// `;




'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, serverTimestamp, addDoc, collection, query, where } from 'firebase/firestore';
import { useCart } from '@/components/CartContext'; // Import your Cart Context
import Swal from 'sweetalert2';
import { useAppContext } from '@/components/Context';

export default function OrderSummaryPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart, getItemEffectivePrice } = useCart(); // Consume from Cart Context

  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0); // Default placeholder fee (₦0 or set as required)

  // Promo code state (synchronized with localStorage from Cart page)
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { payWithPaystack } = useAppContext();
// Add state at the top of OrderSummaryPage
const [subaccountCode, setSubaccountCode] = useState(null);



  // Auth Loader
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load Delivery Address and Saved Promo from localStorage
  useEffect(() => {
    try {
      const storedAddress = localStorage.getItem('selectedAddress');
      if (storedAddress) {
        setDeliveryAddress(JSON.parse(storedAddress));
      }

      // Sync promo state applied on Cart page
      const savedDiscount = localStorage.getItem('appliedDiscount');
      const savedPromoName = localStorage.getItem('appliedPromoName');
      if (savedDiscount) setDiscount(Number(savedDiscount));
      if (savedPromoName) setAppliedPromo(savedPromoName);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculations using cartSubtotal from context
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - discount);



// Helper to format items with their correct calculated prices and totals before saving/sending
  const getProcessedCartItems = () => {
    return cart.map((item) => {
      const itemPrice = typeof getItemEffectivePrice === 'function' 
        ? getItemEffectivePrice(item) 
        : Number(item.price || item.amount || 0);
      const itemTotal = itemPrice * Number(item.quantity || 1);

      return {
        ...item,
        price: itemPrice,     // Overwrite with exact effective unit price displayed
        total: itemTotal      // Ensure total is correctly calculated and stored
      };
    });
  };




// Fetch subaccount on page load
useEffect(() => {
  const fetchSubaccount = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "subaccounts"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        if (data.subaccount_code) {
          setSubaccountCode(data.subaccount_code);
        }
      }
    } catch (error) {
      console.error("Error pre-fetching subaccount:", error);
    }
  };
  fetchSubaccount();
}, []);



//   const handlePayNow = async () => {
//     if (!deliveryAddress) {
//       Swal.fire('Missing Address', 'Please select a delivery address before proceeding.', 'warning');
//       router.push('/dashboard/addressmanager');
//       return;
//     }

//     if (cart.length === 0) {
//       Swal.fire('Empty Cart', 'Your cart is empty.', 'warning');
//       return;
//     }

//     try {
//       // 1. Fetch the global subaccount from Firestore
//       const querySnapshot = await getDocs(collection(db, "subaccounts"));
      
//       if (querySnapshot.empty) {
//         Swal.fire('Payout Account Missing', 'The seller has not added a payout account yet. Please try again later.', 'warning');
//         return;
//       }

//       const subaccountData = querySnapshot.docs[0].data();
//       const subaccountCode = subaccountData.subaccount_code;

//       if (!subaccountCode) {
//         Swal.fire('Invalid Payout Setup', 'The seller payout account configuration is invalid.', 'error');
//         return;
//       }

//       const uniqueOrderNumber = `ORDER-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

// // 👉 REPLACE "items: cart" WITH THIS:
//       const processedItems = getProcessedCartItems();


//       const orderPayload = {
//         orderNumber: uniqueOrderNumber,
//         userId: currentUser ? currentUser.uid : 'guest',
//         items: processedItems,
//         deliveryAddress,
//         subtotal: cartSubtotal,
//         deliveryFee,
//         discount,
//         finalTotal,
//         promoCode: appliedPromo,
//         currency: 'NGN',
//         accountInfo: {
//           name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
//           email: currentUser?.email,
//           phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
//         },
//         paymentType: 'ONLINE PAYMENT',
//         paymentStatus: 'Paid',
//         orderStatus: 'Pending',
//         createdAt: serverTimestamp()
//       };

//       localStorage.setItem('pendingOrder', JSON.stringify(orderPayload));

//       // 2. Pass the subaccount code to your Paystack function
//       payWithPaystack(finalTotal, 'NGN', subaccountCode);

//     } catch (error) {
//       console.error("Error fetching subaccount:", error);
//       Swal.fire('Error', 'Could not verify the seller payout account. Please try again.', 'error');
//     }
//   };

  // Pay on Delivery Handler with Swal Confirmation & Safeguards
 
//  console.log(currentUser)
 
 
 const handlePayNow = async () => {
    if (!deliveryAddress) {
      Swal.fire('Missing Address', 'Please select a delivery address before proceeding.', 'warning');
      router.push('/dashboard/addressmanager');
      return;
    }

    if (cart.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty.', 'warning');
      return;
    }

    if (!subaccountCode) {
      Swal.fire('Payout Account Missing', 'The seller payout account is still loading or missing. Please try again.', 'warning');
      return;
    }

    const uniqueOrderNumber = `ORDER-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;
    const processedItems = getProcessedCartItems();

    
       const email = currentUser?.email;
          const name = currentUser?.displayName || "";

    const orderPayload = {
      orderNumber: uniqueOrderNumber,
      userId: currentUser ? currentUser.uid : 'guest',
      items: processedItems,
      deliveryAddress,
      subtotal: cartSubtotal,
      deliveryFee,
      discount,
      finalTotal,
      promoCode: appliedPromo,
      currency: 'NGN',
      accountInfo: {
        name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
        email: currentUser?.email,
        phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
      },
      paymentType: 'ONLINE PAYMENT',
      paymentStatus: 'Paid',
      orderStatus: 'Pending',
      createdAt: serverTimestamp()
    };

    try {
      localStorage.setItem('pendingOrder', JSON.stringify(orderPayload));
      // Instantly trigger Paystack without waiting for network requests
      // payWithPaystack(finalTotal, 'NGN', subaccountCode);
      payWithPaystack(finalTotal, 'NGN', subaccountCode, email, name)

    } catch (error) {
      console.error("Error setting up payment session:", error);
      Swal.fire('Error', 'Could not initialize payment. Please try again.', 'error');
    }
  };
 
 
 
 
  const handlePayOnDelivery = async () => {
    if (!deliveryAddress) {
      Swal.fire('Missing Address', 'Please select a delivery address before proceeding.', 'warning');
      router.push('/dashboard/addressmanager');
      return;
    }

    if (cart.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty.', 'warning');
      return;
    }

    const confirmResult = await Swal.fire({
      title: 'Confirm Pay on Delivery',
      text: `Are you sure you want to place this order with Pay on Delivery? Total: ₦${finalTotal.toLocaleString()}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Place Order'
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setIsSubmitting(true);
    Swal.fire({
      title: 'Processing Order...',
      text: 'Please wait while we process your order.',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();

    try {
      const buyerEmail = currentUser?.email || userData?.email || '';
      // const sellerEmail = 'majinfotek@gmail.com';
      const sellerEmail = 'esomesther@gmail.com';
      const uniqueOrderNumber = `ORDER-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

      const ordersRef = collection(db, "orders");
      const qCheck = query(ordersRef, where("orderNumber", "==", uniqueOrderNumber));
      const existingCheck = await getDocs(qCheck);
      
      if (!existingCheck.empty) {
        throw new Error("Order number collision detected. Please try again.");
      }

      // 👉 REPLACE "items: cart" WITH THIS:
      const processedItems = getProcessedCartItems();

      // const orderPayload = {
      //   orderNumber: uniqueOrderNumber,
      //   userId: currentUser ? currentUser.uid : 'guest',
      //   items: processedItems,
      //   deliveryAddress,
      //   subtotal: cartSubtotal,
      //   deliveryFee,
      //   discount,
      //   finalTotal,
      //   promoCode: appliedPromo,
      //   currency: 'NGN',
      //   accountInfo: {
      //     name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
      //     email: buyerEmail,
      //     phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
      //   },
      //   paymentType: 'PAYMENT ON DELIVERY',
      //   paymentStatus: 'Pending',
      //   orderStatus: 'Pending',
      //   createdAt: serverTimestamp()
      // };





 const orderPayload = {
  orderNumber: uniqueOrderNumber || '',
  userId: currentUser ? currentUser.uid : 'guest',
  items: processedItems || [],
  deliveryAddress: deliveryAddress || {},
  subtotal: cartSubtotal || 0,
  deliveryFee: deliveryFee || 0,
  discount: discount || null,         // ⚠️ Often undefined if no discount
  finalTotal: finalTotal || 0,
  promoCode: appliedPromo || null,    // ⚠️ Often undefined if no promo code
  currency: 'NGN',
  accountInfo: {
    name: userData?.fullName || currentUser?.displayName || 'Valued Customer',
    email: buyerEmail || '',          // ⚠️ Check if buyerEmail can be undefined
    phone: userData?.phone || currentUser?.phoneNumber || 'Not provided'
  },
  paymentType: 'PAYMENT ON DELIVERY',
  paymentStatus: 'Pending',
  orderStatus: 'Pending',
  createdAt: serverTimestamp()
};

// Function to remove undefined values recursively
const removeUndefined = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    );
  }
  return obj;
};

// Use it before addDoc:
const docRef = await addDoc(collection(db, "orders"), removeUndefined(orderPayload));
 
 
      // const docRef = await addDoc(collection(db, "orders"), orderPayload);

      try {
        const emailPayload = {
          ...orderPayload,
          createdAt: new Date().toISOString()
        };

        await fetch('/api/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: docRef.id,
            payload: emailPayload,
            recipients: [buyerEmail, sellerEmail].filter(Boolean)
          })
        });
      } catch (emailErr) {
        console.error("Error triggering email notification (non-fatal):", emailErr);
      }

      if (typeof clearCart === 'function') {
        clearCart();
      }
      localStorage.removeItem('selectedAddress');
      localStorage.removeItem('pendingOrder');
      localStorage.removeItem('appliedDiscount');
      localStorage.removeItem('appliedPromoName');

      await Swal.fire({
        title: 'Order Placed Successfully!',
        text: 'Your Pay on Delivery order has been placed. We have sent confirmation details to your email.',
        icon: 'success',
        confirmButtonText: 'View Orders'
      });

      router.push('/dashboard/myorders');

    } catch (error) {
      console.error("Error processing Pay on Delivery order:", error);
      Swal.fire('Error', error.message || 'Failed to place your order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
      Swal.close();
    }
  };

  if (loading) {
    return <LoadingText>Loading Order Summary...</LoadingText>;
  }

  return (
    <Container>
      <PageTitle>Order Summary</PageTitle>

      <LayoutGrid>
        {/* Left Column: Details & Cart */}
        <MainContent>
          {/* Account Information */}
          <Card>
            <CardHeader>
              <h3>Account Information</h3>
            </CardHeader>
            <CardBody>
              {currentUser ? (
                <InfoGrid>
                  <div>
                    <Label>Name</Label>
                    <Value>{userData?.fullName || currentUser.displayName || 'Valued Customer'}</Value>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Value>{currentUser.email}</Value>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Value>{userData?.phone || currentUser.phoneNumber || 'Not provided'}</Value>
                  </div>
                </InfoGrid>
              ) : (
                <WarningText>Please log in to view account details.</WarningText>
              )}
            </CardBody>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <h3>Delivery Address</h3>
              <TextButton onClick={() => router.push('/dashboard/addressmanager')}>Change / Select</TextButton>
            </CardHeader>
            <CardBody>
              {deliveryAddress ? (
                <div>
                  <AddressName>{deliveryAddress.fullName}</AddressName>
                  <AddressText>{deliveryAddress.street}</AddressText>
                  <AddressText>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}</AddressText>
                  <AddressText>{deliveryAddress.country}</AddressText>
                  <AddressText>Phone: {deliveryAddress.phone}</AddressText>
                </div>
              ) : (
                <EmptyStateBox>
                  <WarningText>No delivery address selected.</WarningText>
                  <ActionButton onClick={() => router.push('/dashboard/addressmanager')}>Select Address</ActionButton>
                </EmptyStateBox>
              )}
            </CardBody>
          </Card>

          {/* Cart Items from Context */}
          <Card>
            <CardHeader>
              <h3>Cart Items ({cart.length}) <span>(◀ Scroll▶)</span></h3>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              {cart.length === 0 ? (
                <EmptyCartText>Your cart is empty.</EmptyCartText>
              ) : (
                <TableResponsiveWrapper>
                  <CartTable>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => {
                        const itemPrice = typeof getItemEffectivePrice === 'function' 
                          ? getItemEffectivePrice(item) 
                          : Number(item.price || item.amount || 0);
                        const itemTotal = itemPrice * Number(item.quantity || 1);
                        return (
                          <tr key={`${item.id}-${JSON.stringify(item.variations || {})}-${index}`}>
                            <td>
                              <ItemInfo>
                                {item.image && <ItemImg src={item.image} alt={item.name || item.title} />}
                                <div>
                                  <ItemName>{item.name || item.title}</ItemName>
                                  
                                  {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                                      {Object.entries(item.variations).map(([key, value]) => (
                                        <span 
                                          key={key} 
                                          style={{ 
                                            fontSize: "0.65rem", 
                                            color: "#475569", 
                                            background: "#f1f5f9", 
                                            padding: "1px 5px", 
                                            borderRadius: "4px", 
                                            fontWeight: "600", 
                                            textTransform: "capitalize" 
                                          }}
                                        >
                                          {key}: <strong style={{ color: "#0f172a" }}>{String(value)}</strong>
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '2px' }}>ID: {item.id}</p>
                                </div>
                              </ItemInfo>
                            </td>

                            <td>₦{itemPrice.toLocaleString()}</td>
                            <td>{item.quantity}</td>
                            <td>₦{itemTotal.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </CartTable>
                </TableResponsiveWrapper>
              )}
            </CardBody>
          </Card>
        </MainContent>

        {/* Right Column: Pricing & Checkout */}
        <Sidebar>
          <SummaryCard>
            <h3>Order Totals</h3>
            
            <SummaryRow>
              <span>Subtotal</span>
              <span>₦{cartSubtotal.toLocaleString()}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Delivery Fee</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </SummaryRow>

            {/* Only show discount row if active from cart */}
            {discount > 0 && (
              <SummaryRow discount>
                <span>Discount ({appliedPromo || 'Promo Applied'})</span>
                <span>-₦{discount.toLocaleString()}</span>
              </SummaryRow>
            )}

            <Divider />

            <TotalRow>
              <span>Final Total</span>
              <span>₦{finalTotal.toLocaleString()}</span>
            </TotalRow>

            {/* Applied Promo Badge Display Only (promo code input removed as requested) */}
            {appliedPromo && (
              <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 12px", borderRadius: "6px" }}>
                <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "600" }}>🎟️ {appliedPromo}</span>
              </div>
            )}

            <PayNowButton onClick={handlePayNow} disabled={cart.length === 0 || !deliveryAddress}>
              PAY NOW (₦{finalTotal.toLocaleString()})
            </PayNowButton>
            
            <PayOnDeliveryButton onClick={handlePayOnDelivery} disabled={cart.length === 0 || !deliveryAddress || isSubmitting}>
              {isSubmitting ? 'Processing Order...' : 'PAY ON DELIVERY'}
            </PayOnDeliveryButton>
          </SummaryCard>
        </Sidebar>
      </LayoutGrid>
    </Container>
  );
}

// --- Styled Components (Theme Colors: PrimaryNavy #0B1B48, PrimaryCyan #00AEEF, Gradient) ---

const PrimaryNavy = "#1c3ba4";
const PrimaryCyan = " #8b5cf6";
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%,  #8b5cf6 100%)";;
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";


const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 10px;
  box-sizing: border-box;
  color: ${Dark};
  width: 100%;
  overflow-x: hidden;

  @media (min-width: 768px) {
    margin: 40px auto;
    padding: 0 20px;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  border-bottom: 2px solid ${PrimaryCyan};
  padding-bottom: 8px;
  color: ${PrimaryNavy};

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 24px;
    padding-bottom: 12px;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 380px;
    gap: 10px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Card = styled.div`
  background: ${White};
  border: 1px solid ${Border};
  border-top: 4px solid ${PrimaryCyan};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(11, 27, 72, 0.04);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: ${LightBg};
  border-bottom: 1px solid ${Border};

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${PrimaryNavy};
    font-weight: 700;
  }

  span {
    display: none;
    font-size: 0.75rem;
    @media (max-width: 480px) {
      display: inline;
    }
  }

  @media (min-width: 768px) {
    padding: 10px;
    h3 {
      font-size: 1.1rem;
    }
  }
`;

const CardBody = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 768px) {
    padding: 10px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${TextMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const Value = styled.span`
  font-size: 0.9rem;
  color: ${Dark};
  font-weight: 600;
  word-break: break-word;
`;

const AddressName = styled.h4`
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: ${PrimaryNavy};
  font-weight: 700;
`;

const AddressText = styled.p`
  margin: 2px 0;
  font-size: 0.85rem;
  color: ${TextMuted};
  word-break: break-word;
`;

const TextButton = styled.button`
  background: transparent;
  color: ${PrimaryNavy};
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
    color: ${PrimaryCyan};
  }
`;

const ActionButton = styled.button`
  background: ${PrimaryNavy};
  color: ${White};
  border: 1px solid ${PrimaryCyan};
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background: ${PrimaryCyan};
    color: ${White};
  }
`;

const EmptyStateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const WarningText = styled.p`
  color: ${TextMuted};
  font-size: 0.9rem;
  margin: 0;
  word-break: break-word;
`;

const EmptyCartText = styled.p`
  padding: 20px;
  text-align: center;
  color: ${TextMuted};
  margin: 0;
`;

const TableResponsiveWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
  min-width: 280px;

  th {
    background: ${LightBg};
    color: ${Dark};
    padding: 10px;
    font-weight: 600;
    border-bottom: 1px solid ${Border};
    white-space: nowrap;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid ${Border};
    color: ${TextMuted};
    vertical-align: middle;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    th, td {
      padding: 10px;
    }
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${Border};
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ItemName = styled.span`
  font-weight: 600;
  color: ${Dark};
  display: block;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 768px) {
    max-width: none;
    white-space: normal;
  }
`;

const SummaryCard = styled.div`
  background: ${White};
  border: 1px solid ${PrimaryCyan};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(11, 27, 72, 0.06);
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 900px) {
    position: sticky;
    top: 10px;
    padding: 10px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: ${PrimaryNavy};
    font-weight: 700;
    border-bottom: 2px solid ${LightBg};
    padding-bottom: 10px;

    @media (min-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: ${props => (props.discount ? '#2e7d32' : TextMuted)};
  font-weight: ${props => (props.discount ? '600' : '400')};

  @media (min-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${Border};
  margin: 10px 0;

  @media (min-width: 768px) {
    margin: 10px 0;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 800;
  color: ${PrimaryNavy};
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const PayNowButton = styled.button`
  width: 100%;
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 14px;
    font-size: 1rem;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 60px;
  font-size: 1.1rem;
  color: ${PrimaryNavy};
  font-weight: 600;
`;

const PayOnDeliveryButton = styled.button`
  width: 100%;
  background: ${White};
  color: ${PrimaryNavy};
  border: 2px solid ${PrimaryNavy};
  padding: 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:hover {
    background: ${PrimaryNavy};
    color: ${White};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 14px;
    font-size: 1rem;
    margin-top: 10px;
  }
`;