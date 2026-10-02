


// "use client";

// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { Star, Quote, CheckCircle2, Heart, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import ProofAndTestimonials from "./ProofAndTestimonials";

// /* ================= THEME STYLES (ENITZ RETAIL) ================= */
// const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
// const LightBg = "#ffffff";
// const CardBg = "#f8fafc";
// const TextPrimary = "#0f172a";
// const TextMuted = "#475569";
// const BorderColor = "rgba(226, 232, 240, 0.9)";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const pulseGlow = keyframes`
//   0% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0.4); }
//   70% { box-shadow: 0 0 0 22px rgba(0, 174, 239, 0); }
//   100% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0); }
// `;

// /* ================= COMPONENTS ================= */

// const SectionWrapper = styled.section`
//   padding: 7rem 1.5rem;
//   background-color: ${LightBg};
//   border-top: 1px solid ${BorderColor};
//   border-bottom: 1px solid ${BorderColor};
//   overflow: hidden;
// `;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const SectionHeader = styled.div`
//   text-align: center;
//   max-width: 52rem;
//   margin: 0 auto 4rem auto;

//   .badge-pill {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//     padding: 0.5rem 1.25rem;
//     background: linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(11, 27, 72, 0.1));
//     border: 1px solid rgba(0, 174, 239, 0.2);
//     border-radius: 9999px;
//     color: #00aeef;
//     font-weight: 700;
//     font-size: 0.85rem;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     margin-bottom: 1.25rem;
//   }

//   h2 {
//     font-size: 2.25rem;
//     font-weight: 800;
//     margin-bottom: 1.25rem;
//     color: ${TextPrimary};
//     letter-spacing: -0.02em;
//     @media (min-width: 768px) { font-size: 3.25rem; }
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 1.15rem;
//     line-height: 1.7;
//   }
// `;

// const TestimonialGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 2rem;
//   margin-bottom: 6rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const TestimonialCard = styled.div`
//   background: ${CardBg};
//   border: 1px solid ${BorderColor};
//   border-radius: 2rem;
//   padding: 2.5rem 2rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
//   transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//   box-shadow: 0 15px 40px rgba(15, 23, 42, 0.03);
//   animation: ${fadeIn} 0.6s ease-in-out;

//   &:hover {
//     transform: translateY(-8px);
//     border-color: rgba(0, 174, 239, 0.4);
//     box-shadow: 0 30px 60px -15px rgba(0, 174, 239, 0.12);
//   }

//   .quote-icon {
//     position: absolute;
//     top: 1.75rem;
//     right: 2rem;
//     color: rgba(0, 174, 239, 0.15);
//     width: 48px;
//     height: 48px;
//   }

//   .stars {
//     display: flex;
//     gap: 0.25rem;
//     margin-bottom: 1.5rem;
//     color: #f59e0b;
//   }

//   p.review-text {
//     color: ${TextMuted};
//     font-size: 1.05rem;
//     line-height: 1.75;
//     margin-bottom: 2rem;
//     font-style: italic;
//   }
// `;

// const ClientInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   border-top: 1px solid ${BorderColor};
//   padding-top: 1.25rem;

//   .avatar-initials {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     background: ${ThemeGradient};
//     color: #ffffff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-weight: 800;
//     font-size: 1.1rem;
//     border: 2px solid #00aeef;
//     flex-shrink: 0;
//   }

//   .details {
//     h4 {
//       font-size: 1.05rem;
//       font-weight: 800;
//       color: ${TextPrimary};
//       margin: 0;
//     }

//     p {
//       font-size: 0.85rem;
//       color: ${TextMuted};
//       margin: 0;
//     }
//   }

//   .verified-badge {
//     margin-left: auto;
//     display: flex;
//     align-items: center;
//     color: #00aeef;
//   }
// `;

// /* --- HERITAGE BANNER SECTION --- */
// const HeritageBanner = styled.div`
//   padding: 5rem 2rem;
//   background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf2f8 100%);
//   position: relative;
//   overflow: hidden;
//   border-radius: 2.5rem;
//   border: 1px solid ${BorderColor};

//   &::before {
//     content: '';
//     position: absolute;
//     width: 400px;
//     height: 400px;
//     background: radial-gradient(circle, rgba(0, 174, 239, 0.15) 0%, transparent 70%);
//     top: -200px;
//     left: -200px;
//     border-radius: 50%;
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     width: 400px;
//     height: 400px;
//     background: radial-gradient(circle, rgba(11, 27, 72, 0.15) 0%, transparent 70%);
//     bottom: -200px;
//     right: -200px;
//     border-radius: 50%;
//   }

//   .banner-content {
//     max-width: 800px;
//     margin: 0 auto;
//     text-align: center;
//     position: relative;
//     z-index: 2;
//   }

//   h2 {
//     font-size: 2.5rem;
//     font-weight: 900;
//     margin-bottom: 1.5rem;
//     color: ${TextPrimary};
//     letter-spacing: -0.03em;
//     @media (min-width: 768px) { font-size: 3.25rem; }
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 1.15rem;
//     line-height: 1.8;
//     margin-bottom: 2.5rem;
//   }
// `;

// const PrimaryButton = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.75rem;
//   padding: 1.15rem 2.6rem;
//   border-radius: 9999px;
//   background: ${ThemeGradient};
//   color: #ffffff;
//   font-weight: 700;
//   font-size: 1.05rem;
//   box-shadow: 0 14px 30px -5px rgba(0, 174, 239, 0.45);
//   transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
//   text-decoration: none;
//   animation: ${pulseGlow} 3s infinite;

//   &:hover {
//     transform: translateY(-3px) scale(1.02);
//     box-shadow: 0 20px 40px -5px rgba(0, 174, 239, 0.65);
//     animation: none;
//   }
// `;

// /* Updated Real Testimonials from WhatsApp & Facebook logs */
// const testimonialsData = [
//   {
//     id: 1,
//     name: "Mrs. Zainab",
//     role: "Verified Wholesaler",
//     initials: "MZ",
//     rating: 5,
//     text: "My dear Enitz, don't know how to write this review but just know that I am really happy with all items I got from you The tabs were lovely, the kiddies stuffs I got are so beautiful, my cutomers love them. U have always delivered 💯 💯 from years of transactions that we've shared. U were my first online plug and you've always stand out. Always giving me reasons to come back again."
//   },
//   {
//     id: 2,
//     name: "Mrs. Abubakar",
//     role: "Regular Customer",
//     initials: "UA",
//     rating: 5,
//     text: "Wellwell 😂.Salam Alaykum ma. Wa aleykum Salam warahmotullahi wabarakahtu ma. In fact my husband just dey bounce"
//   },
//   {
//     id: 3,
//     name: "Mrs. Alebiosu",
//     role: "Verified Buyer",
//     initials: "MA",
//     rating: 5,
//     text: "Wow, this charcoal stove is amazing. I've stopped using my kerosene stove since I bought it. In fact, I feel like dancing. Thank you for helping me with it!"
//   }
// ];

// export default function TestimonialsSection() {
//   return (
// <>
//     <SectionWrapper id='testimonials'>
//       <Container>
//         <SectionHeader>
//           <div className="badge-pill">
//             <Quote className="w-4 h-4 text-cyan-500" /> Customer Testimonials
//           </div>
//           <h2>Trusted By Real Shoppers & Wholesalers</h2>
//           <p>
//             Read genuine feedback from our valued customers and wholesale partners who rely on Enitz for top-tier quality.
//           </p>
//         </SectionHeader>

//         <TestimonialGrid>
//           {testimonialsData.map((item) => (
//             <TestimonialCard key={item.id}>
//               <Quote className="quote-icon" />
//               <div>
//                 <div className="stars">
//                   {[...Array(item.rating)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 fill-current" />
//                   ))}
//                 </div>
//                 <p className="review-text">"{item.text}"</p>
//               </div>

//               <ClientInfo>
//                 <div className="avatar-initials">{item.initials}</div>
//                 <div className="details">
//                   <h4>{item.name}</h4>
//                   <p>{item.role}</p>
//                 </div>
//                 <div className="verified-badge" title="Verified Customer">
//                   <CheckCircle2 className="w-5 h-5" />
//                 </div>
//               </ClientInfo>
//             </TestimonialCard>
//           ))}
//         </TestimonialGrid>
//   <ProofAndTestimonials />
//         <HeritageBanner>
//           <div className="banner-content">
//             <div className="badge-pill" style={{ margin: '0 auto 1.5rem auto', display: 'inline-flex' }}>
//               <Heart className="w-4 h-4 text-cyan-500" /> Customer First
//             </div>
//             <h2>Ready to Experience Seamless Shopping?</h2>
//             <p>
//               Join thousands of satisfied shoppers who trust Enitz for exceptional product quality, great pricing, and reliable service.
//             </p>
//             <PrimaryButton href="/store">
//               Browse All Products
//               <ArrowRight className="w-5 h-5" />
//             </PrimaryButton>
//           </div>
//         </HeritageBanner>
//       </Container>
//     </SectionWrapper>
  
// </>
//   );
// }



"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { Star, Quote, CheckCircle2, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProofAndTestimonials from "./ProofAndTestimonials";
import AuthorizedDistributor from "./AuthorizedDistributor";

/* ================= THEME STYLES (MAJINFOTEK) ================= */
const primaryBlue = "#1c3ba4";
const richPurple = "#8b5cf6";
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%, #8b5cf6 100%)";
const LightBg = "#ffffff";
const CardBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  70% { box-shadow: 0 0 0 22px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
`;

/* ================= COMPONENTS ================= */

const SectionWrapper = styled.section`
  padding: 7rem 1.5rem;
  background-color: ${LightBg};
  border-top: 1px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 52rem;
  margin: 0 auto 4rem auto;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(28, 59, 164, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 9999px;
    color: ${richPurple};
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    margin-bottom: 1.25rem;
    color: ${TextPrimary};
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.15rem;
    line-height: 1.7;
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 6rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.03);
  animation: ${fadeIn} 0.6s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 30px 60px -15px rgba(139, 92, 246, 0.18);
  }

  .quote-icon {
    position: absolute;
    top: 1.75rem;
    right: 2rem;
    color: rgba(139, 92, 246, 0.15);
    width: 48px;
    height: 48px;
  }

  .stars {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    color: #f59e0b;
  }

  p.review-text {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.75;
    margin-bottom: 2rem;
    font-style: italic;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid ${BorderColor};
  padding-top: 1.25rem;

  .avatar-initials {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${ThemeGradient};
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.1rem;
    border: 2px solid ${richPurple};
    flex-shrink: 0;
  }

  .details {
    h4 {
      font-size: 1.05rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin: 0;
    }

    p {
      font-size: 0.85rem;
      color: ${TextMuted};
      margin: 0;
    }
  }

  .verified-badge {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: ${richPurple};
  }
`;

/* --- HERITAGE BANNER SECTION --- */
const HeritageBanner = styled.div`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf2f8 100%);
  position: relative;
  overflow: hidden;
  border-radius: 2.5rem;
  border: 1px solid ${BorderColor};

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(28, 59, 164, 0.12) 0%, transparent 70%);
    top: -200px;
    left: -200px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
    bottom: -200px;
    right: -200px;
    border-radius: 50%;
  }

  .banner-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    color: ${TextPrimary};
    letter-spacing: -0.03em;
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.15rem 2.6rem;
  border-radius: 9999px;
  background: ${ThemeGradient};
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 14px 30px -5px rgba(139, 92, 246, 0.45);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  animation: ${pulseGlow} 3s infinite;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px -5px rgba(139, 92, 246, 0.65);
    animation: none;
  }
`;

/* Testimonials Data */
const testimonialsData = [
  {
    id: 1,
    name: "Engr. Adebayo",
    role: "Corporate Partner",
    initials: "EA",
    rating: 5,
    text: "The surveillance and access control infrastructure deployed by Majinfotek has completely transformed our corporate security operations. Their technical expertise and seamless delivery are truly world-class."
  },
  {
    id: 2,
    name: "Mrs. Umu Alli",
    role: "Residential Client",
    initials: "UA",
    rating: 5,
    text: "Top-notch smart home integration and automated intercom systems! The installation team was extremely professional, and the remote monitoring setup gives our family total peace of mind."
  },
  {
    id: 3,
    name: "Mr. Chukwudi",
    role: "Industrial Facility Manager",
    initials: "MC",
    rating: 5,
    text: "Reliable, efficient, and exceptionally professional. Their biometric security gates and perimeter defense systems handle our heavy industrial traffic effortlessly. Highly recommended!"
  }
];

export default function TestimonialsSection() {
  return (
    <>
      <SectionWrapper id='testimonials'>
        <Container>
          <SectionHeader>
            <div className="badge-pill">
              <Quote className="w-4 h-4 text-purple-600" /> Customer Testimonials
            </div>
            <h2>Trusted By Industry Leaders & Homeowners</h2>
            <p>
              Read genuine feedback from our valued corporate clients and partners who rely on Majinfotek for top-tier security and technology solutions.
            </p>
          </SectionHeader>

          <TestimonialGrid>
            {testimonialsData.map((item) => (
              <TestimonialCard key={item.id}>
                <Quote className="quote-icon" />
                <div>
                  <div className="stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="review-text">"{item.text}"</p>
                </div>

                <ClientInfo>
                  <div className="avatar-initials">{item.initials}</div>
                  <div className="details">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                  <div className="verified-badge" title="Verified Customer">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </ClientInfo>
              </TestimonialCard>
            ))}
          </TestimonialGrid>

          <ProofAndTestimonials />
<AuthorizedDistributor /> 
          <HeritageBanner>
            <div className="banner-content">
              <div className="badge-pill" style={{ margin: '0 auto 1.5rem auto', display: 'inline-flex' }}>
                <Heart className="w-4 h-4 text-purple-600" /> Secure Your Infrastructure
              </div>
              <h2>Ready to Elevate Your Security Standards?</h2>
              <p>
                Join hundreds of satisfied organizations and homeowners who trust Majinfotek for advanced security integration, expert deployment, and reliable support.
              </p>
              <PrimaryButton href="/contact">
                Get a Consultation
                <ArrowRight className="w-5 h-5" />
              </PrimaryButton>
            </div>
          </HeritageBanner>
        </Container>
      </SectionWrapper>
    </>
  );
}