


// "use client";

// import { useState } from "react";
// import styled from "styled-components";
// import Link from "next/link";
// import Image from "next/image";

// /* ================= COLORS (ENITZ THEME) ================= */

// const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
// const Dark = "#0f172a";
// const Border = "#334155";
// const White = "#ffffff";
// const TextMuted = "#94a3b8";
// const PrimaryAccent = "#00AEEF";

// /* ================= FOOTER STYLES ================= */

// const FooterContainer = styled.footer`
//   background: ${Dark};
//   color: ${White};
//   border-top: 1px solid ${Border};
//   font-family: inherit;
//   position: relative;
// `;

// const FooterInner = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 3rem 1.5rem 1.5rem 1.5rem;

//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1.5fr;
//   gap: 2rem;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr 1fr;
//     gap: 2rem;
//   }

//   @media (max-width: 576px) {
//     grid-template-columns: 1fr;
//     gap: 2rem;
//   }
// `;

// const FooterCol = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const Logo = styled.div`
//   font-size: 1.4rem;
//   font-weight: 800;
//   color: ${White};
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   span {
//     background: ${ThemeGradient};
//     background-size: 200% auto;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const FooterText = styled.p`
//   color: ${TextMuted};
//   font-size: 0.95rem;
//   line-height: 1.7;
// `;

// const ColTitle = styled.h4`
//   font-size: 1.1rem;
//   font-weight: 700;
//   color: ${White};
//   letter-spacing: 0.05em;
//   text-transform: uppercase;
//   margin-bottom: 0.25rem;
// `;

// const FooterLink = styled(Link)`
//   color: ${TextMuted};
//   text-decoration: none;
//   font-size: 0.95rem;
//   transition: all 0.2s ease;
//   width: fit-content;

//   &:hover {
//     color: ${PrimaryAccent};
//     padding-left: 4px;
//   }
// `;

// const ContactInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   color: ${TextMuted};
//   font-size: 0.95rem;

//   p {
//     margin: 0;
//     line-height: 1.5;
//   }

//   span {
//     color: ${White};
//   }
// `;

// const SocialIconsContainer = styled.div`
//   display: flex;
//   gap: 12px;
//   margin-top: 0.5rem;
// `;

// const SocialIconLink = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: #1e293b;
//   border: 1px solid ${Border};
//   color: ${TextMuted};
//   transition: all 0.3s ease;

//   &:hover {
//     background: ${ThemeGradient};
//     color: ${White};
//     border-color: transparent;
//     transform: translateY(-3px);
//   }

//   svg {
//     width: 18px;
//     height: 18px;
//     fill: currentColor;
//   }
// `;

// const BottomBarWrapper = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 0 1.5rem;
// `;

// const BottomBar = styled.div`
//   padding: 2rem 0;
//   border-top: 1px solid ${Border};

//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//     text-align: center;
//   }
// `;

// const Copyright = styled.p`
//   color: ${TextMuted};
//   font-size: 0.85rem;
//   margin: 0;
// `;

// const LegalLinks = styled.div`
//   display: flex;
//   gap: 1.5rem;

//   a {
//     color: ${TextMuted};
//     text-decoration: none;
//     font-size: 0.85rem;
//     transition: color 0.2s ease;

//     &:hover {
//       color: ${White};
//     }
//   }
// `;

// /* ================= FLOATING WHATSAPP ================= */

// const WhatsAppFloat = styled.a`
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
//   z-index: 300;
//   background-color: #25d366;
//   color: white;
//   width: 55px;
//   height: 55px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: scale(1.1);
//     box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
//   }
// `;

// /* ================= NEWSLETTER & MODAL STYLES ================= */

// const NewsletterButton = styled.button`
//   background: ${ThemeGradient};
//   color: ${White};
//   border: none;
//   padding: 0.75rem 1.25rem;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 0.95rem;
//   cursor: pointer;
//   transition: opacity 0.2s ease, transform 0.2s ease;
//   margin-top: 0.55rem;
//   width: fit-content;

//   &:hover {
//     opacity: 0.9;
//     transform: translateY(-2px);
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(11, 27, 72, 0.7);
//   backdrop-filter: blur(4px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   padding: 1rem;
// `;

// const ModalContent = styled.div`
//   background: ${Dark};
//   border: 1px solid ${Border};
//   padding: 2.5rem 2rem;
//   border-radius: 16px;
//   width: 100%;
//   max-width: 420px;
//   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   gap: 1.25rem;
//   color: ${White};
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   background: transparent;
//   border: none;
//   color: ${TextMuted};
//   font-size: 1.25rem;
//   cursor: pointer;

//   &:hover {
//     color: ${White};
//   }
// `;

// const ModalTitle = styled.h3`
//   font-size: 1.4rem;
//   font-weight: 800;
//   margin: 0;
//   color: ${White};
// `;

// const ModalSubtitle = styled.p`
//   color: ${TextMuted};
//   font-size: 0.9rem;
//   margin: 0;
//   line-height: 1.5;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 0.85rem 1rem;
//   background: #1e293b;
//   border: 1px solid ${Border};
//   border-radius: 8px;
//   color: ${White};
//   font-size: 0.95rem;
//   outline: none;
//   transition: border-color 0.2s;

//   &:focus {
//     border-color: ${PrimaryAccent};
//   }
// `;

// const SubmitButton = styled.button`
//   background: ${ThemeGradient};
//   color: ${White};
//   border: none;
//   padding: 0.85rem;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: opacity 0.2s;

//   &:hover {
//     opacity: 0.9;
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const SuccessMessage = styled.p`
//   color: #22c55e;
//   font-size: 0.9rem;
//   font-weight: 600;
//   margin: 0;
//   text-align: center;
// `;

// /* ================= COMPONENT ================= */

// export default function Footer() {
//   const currentYear = new Date().getFullYear();
//   const whatsappMessage = encodeURIComponent(
//     "Hello Enitz, I just visited your website. I would love to order some products from your website."
//   );

//   // Modal and Form state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const res = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to subscribe");
//       }

//       setSuccess(true);
//       setName("");
//       setEmail("");
      
//       // Close modal automatically after 3 seconds on success
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setSuccess(false);
//       }, 3000);
//     } catch (err) {
//       setErrorMessage(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <FooterContainer>
//         <FooterInner>
//           {/* Col 1: Brand Info */}
//           <FooterCol>
//             <Link href="/" style={{ textDecoration: 'none' }}>
//               <img src='./logo.jpeg' alt='Enitz Limited Logo' style={{width:'50px', borderRadius:"10px"}}/>
//               <Logo>
//                 Enitz
//               </Logo>
//               <p style={{fontStyle:"italic", fontSize:"0.9rem"}}>Quality Within Reach</p>
//             </Link>
//             <FooterText>
//               Enitz Global Limited offers quality personal and household products at affordable prices, making everyday living easy with convenient ordering and delivery.
//             </FooterText>
//           </FooterCol>

//           {/* Col 2: Quick Links */}
//           <FooterCol>
//             <ColTitle>Quick Links</ColTitle>
//             <FooterLink href="/">Home</FooterLink>
//             <FooterLink href="/about">About Us</FooterLink>
//             <FooterLink href="/store">Store</FooterLink>
            
//             <FooterLink href="/terms-conditions">Terms & Conditions</FooterLink>
//             <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
//             <FooterLink href="/delivery-policy">Delivery Policy</FooterLink>
//             <FooterLink href="/return-refund-policy">Return/Refund Policy</FooterLink>
//             <FooterLink href="/contact">Contact Us</FooterLink>
//           </FooterCol>

//           {/* Col 3: Contact & Support */}
//           <FooterCol>
//             <ColTitle>Get in Touch</ColTitle>
//             <ContactInfo>
//               <p>Email: <span>enitzglobal@gmail.com</span></p>
//               <p>Phone: <span>09047103037 / 08160801538</span></p>
//               <p>Location: <span>116 Mushin Road, Isolo, Lagos, Nigeria</span></p>
//             </ContactInfo>
//           </FooterCol>

//           {/* Col 4: Social Media & Newsletter */}
//           <FooterCol>
//             <ColTitle>Connect With Us</ColTitle>
//             <FooterText>
//               Follow us on Instagram and Facebook for updates on new product arrivals and special offers.
//             </FooterText>
//             <SocialIconsContainer>
//               {/* Instagram */}
//               <SocialIconLink 
//                 href="https://www.instagram.com/enitzglobalconcept/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//               >
//                 <svg viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                 </svg>
//               </SocialIconLink>

//               {/* Facebook */}
//               <SocialIconLink 
//                 href="https://www.facebook.com/share/1H5LuogNcg/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//               >
//                 <svg viewBox="0 0 24 24">
//                   <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
//                 </svg>
//               </SocialIconLink>
//             </SocialIconsContainer>

//             {/* Newsletter Button */}
//             <NewsletterButton onClick={() => setIsModalOpen(true)}>
//               Subscribe to Newsletter
//             </NewsletterButton>
//           </FooterCol>
//         </FooterInner>

//         {/* Bottom Bar */}
//         <BottomBarWrapper>
//           <BottomBar>
//             <Copyright>
//               &copy; {currentYear} Enitz Global Limited (RC 9059086). All rights reserved.
//             </Copyright>
//             <LegalLinks>
//               {/* Optional Legal Links */}
//             </LegalLinks>
//           </BottomBar>
//         </BottomBarWrapper>
//       </FooterContainer>

//       {/* Subscription Modal */}
//       {isModalOpen && (
//         <ModalOverlay onClick={() => setIsModalOpen(false)}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
//             <ModalTitle>Join Our Newsletter</ModalTitle>
//             <ModalSubtitle>
//               Get updates on new product arrivals and exclusive discount offers directly to your inbox.
//             </ModalSubtitle>

//             {success ? (
//               <SuccessMessage>
//                 🎉 Thank you for subscribing! We have received your details.
//               </SuccessMessage>
//             ) : (
//               <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                 <FormInput
//                   type="text"
//                   placeholder="Your Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <FormInput
//                   type="email"
//                   placeholder="Your Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 {errorMessage && (
//                   <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0 }}>{errorMessage}</p>
//                 )}
//                 <SubmitButton type="submit" disabled={loading}>
//                   {loading ? "Subscribing..." : "Subscribe Now"}
//                 </SubmitButton>
//               </form>
//             )}
//           </ModalContent>
//         </ModalOverlay>
//       )}

//       {/* Floating WhatsApp Icon with Pre-filled Text */}
//       <WhatsAppFloat 
//         href={`https://wa.me/2349047103037?text=${whatsappMessage}`} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         aria-label="Chat on WhatsApp"
//       >
//         <Image
//           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//           alt="WhatsApp"
//           width={28}
//           height={28}
//         />
//       </WhatsAppFloat>
//     </>
//   );
// }






"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

/* ================= COLORS (MAJINFOTEK THEME) ================= */

const primaryBlue = "#1c3ba4";
const richPurple = "#8b5cf6";
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%, #8b5cf6 100%)";
// const Dark = "#0f172a";
const Dark = "#161616";
const Border = "rgba(226, 232, 240, 0.15)";
const White = "#ffffff";
const TextMuted = "#94a3b8";
const PrimaryAccent = "#8b5cf6";

/* ================= FOOTER STYLES ================= */

const FooterContainer = styled.footer`
  background: ${Dark};
  color: ${White};
  border-top: 1px solid ${Border};
  font-family: inherit;
  position: relative;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 4rem 1.5rem 2rem 1.5rem;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${White};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: ${ThemeGradient};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterText = styled.p`
  color: ${TextMuted};
  font-size: 0.95rem;
  line-height: 1.7;
`;

const ColTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${White};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const FooterLink = styled(Link)`
  color: ${TextMuted};
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    color: ${PrimaryAccent};
    padding-left: 4px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: ${TextMuted};
  font-size: 0.95rem;

  p {
    margin: 0;
    line-height: 1.5;
  }

  span {
    color: ${White};
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 0.5rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e293b;
  border: 1px solid ${Border};
  color: ${TextMuted};
  transition: all 0.3s ease;

  &:hover {
    background: ${ThemeGradient};
    color: ${White};
    border-color: transparent;
    transform: translateY(-3px);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const BottomBarWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1.5rem;
`;

const BottomBar = styled.div`
  padding: 2rem 0;
  border-top: 1px solid ${Border};

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${TextMuted};
  font-size: 0.85rem;
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: ${TextMuted};
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${White};
    }
  }
`;

/* ================= FLOATING WHATSAPP ================= */

const WhatsAppFloat = styled.a`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 300;
  background-color: #25d366;
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
  }
`;

/* ================= NEWSLETTER & MODAL STYLES ================= */

const NewsletterButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  margin-top: 0.55rem;
  width: fit-content;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${Dark};
  border: 1px solid ${Border};
  padding: 2.5rem 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: ${White};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${TextMuted};
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: ${White};
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  color: ${White};
`;

const ModalSubtitle = styled.p`
  color: ${TextMuted};
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  background: #1e293b;
  border: 1px solid ${Border};
  border-radius: 8px;
  color: ${White};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${PrimaryAccent};
  }
`;

const SubmitButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: #22c55e;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

/* ================= COMPONENT ================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappMessage = encodeURIComponent(
    "Hello Majinfotek, I just visited your website. I would like to inquire about your security and technology solutions."
  );

  // Modal and Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      
      // Close modal automatically after 3 seconds on success
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FooterContainer>
        <FooterInner>
          {/* Col 1: Brand Info */}
          <FooterCol>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Logo>
                <img src='/logo.png' alt='Enitz Limited Logo' style={{width:'50px', borderRadius:"10px"}}/>

                <span>Majinfotek</span>
              </Logo>
            </Link>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: TextMuted, margin: 0 }}>Advanced Security & Technology Solutions</p>
            <FooterText>
              Majinfotek delivers world-class surveillance, access control, smart home integration, and enterprise IT infrastructure tailored for modern homes and businesses.
            </FooterText>
          </FooterCol>

          {/* Col 2: Quick Links */}
          <FooterCol>
            <ColTitle>Quick Links</ColTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/store">Shop</FooterLink>
            <FooterLink href="/cart">Cart</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/terms-conditions">Terms and Conditions</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          </FooterCol>

          {/* Col 3: Contact & Support */}
          <FooterCol>
            <ColTitle>Get in Touch</ColTitle>
            <ContactInfo>
              <p>Email: Majinfotek@gmail.com</p>
              <p>Phone: +234 812 603 3123</p>
              <p>Location: 27 Ribadu street by Norman willams off Awolowo road ikoyi Lagos</p>
            </ContactInfo>
          </FooterCol>

          {/* Col 4: Social Media & Newsletter */}
          <FooterCol>
            <ColTitle>Connect With Us</ColTitle>
            <FooterText>
              Follow our channels for updates on cutting-edge security deployments and smart technology tips.
            </FooterText>
            <SocialIconsContainer>
              {/* LinkedIn / Social placeholder */}
              {/* <SocialIconLink 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialIconLink> */}

              {/* Instagram */}
              <SocialIconLink 
                href="https://www.instagram.com/majinfotek_ng?stkn=MmlqcHVycDdqYzF1" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIconLink>

              {/* Twitter / X */}
              {/* <SocialIconLink 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIconLink> */}

              {/* TikTok */}
              <SocialIconLink 
                href="https://www.tiktok.com/@majinfotek_ng?_r=1&_t=ZS-9AIphh0Fd0E" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.29 6.29 0 0 0-5.355 6.224 6.292 6.292 0 0 0 10.743 4.437V9.722a8.136 8.136 0 0 0 4.755 1.516V7.794a4.78 4.78 0 0 1-1.008-.108z"/>
                </svg>
              </SocialIconLink>
            </SocialIconsContainer>

            {/* Newsletter Button */}
            {/* <NewsletterButton onClick={() => setIsModalOpen(true)}>
              Subscribe to Newsletter
            </NewsletterButton> */}
          </FooterCol>
        </FooterInner>

        {/* Bottom Bar */}
        <BottomBarWrapper>
          <BottomBar>
            <Copyright>
              &copy; {currentYear} Majinfotek. All rights reserved.
            </Copyright>
            <LegalLinks style={{textDecoration:"underline", fontStyle:"italic"}}>
           
              <Link href="https://echobyteconcept.vercel.app/" target="_blank">Designed and Powered by Echobyte Concept</Link>
            </LegalLinks>
          </BottomBar>
        </BottomBarWrapper>
      </FooterContainer>

      {/* Subscription Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            <ModalTitle>Join Our Newsletter</ModalTitle>
            <ModalSubtitle>
              Get insights on security best practices, smart technologies, and exclusive service updates directly to your inbox.
            </ModalSubtitle>

            {success ? (
              <SuccessMessage>
                🎉 Thank you for subscribing! We have received your details.
              </SuccessMessage>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <FormInput
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FormInput
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errorMessage && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0 }}>{errorMessage}</p>
                )}
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </SubmitButton>
              </form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Floating WhatsApp Icon with Pre-filled Text */}
      <WhatsAppFloat 
        href={`https://wa.me/2348126033123?text=${whatsappMessage}`} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
        />
      </WhatsAppFloat>
    </>
  );
}