// "use client";

// import React from "react";
// import styled from "styled-components";
// import { Star } from "lucide-react";
// import { useRouter } from "next/navigation";

// /* ================= THEME STYLES ================= */
// const TextPrimary = "#0f172a";
// const TextMuted = "#475569";
// const BorderColor = "rgba(226, 232, 240, 0.9)";

// /* ================= STYLED COMPONENTS ================= */

// const SectionContainer = styled.section`
//   padding: 5rem 1rem;
//   max-width: 1280px;
//   margin: 0 auto;

//   @media (min-width: 768px) {
//     padding: 7rem 1.5rem;
//   }
// `;

// const SectionHeader = styled.div`
//   text-align: center;
//   max-width: 52rem;
//   margin: 0 auto 3.5rem auto;

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
//     font-size: 2rem;
//     font-weight: 800;
//     margin-bottom: 1rem;
//     color: ${TextPrimary};
//     letter-spacing: -0.02em;
//     @media (min-width: 768px) { font-size: 3.25rem; }
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 1.05rem;
//     line-height: 1.7;
//     @media (min-width: 768px) { font-size: 1.15rem; }
//   }
// `;

// const GalleryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr); /* 2 cards per row on mobile */
//   gap: 12px; /* tighter spacing for mobile */

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr); /* 3 cards per row on desktop */
//     gap: 2rem;
//   }
// `;

// const GalleryCard = styled.div`
//   position: relative;
//   border-radius: 1.25rem;
//   overflow: hidden;
//   height: 200px; /* compact height for mobile 2-column view */
//   box-shadow: 0 15px 30px rgba(15, 23, 42, 0.06);
//   border: 1px solid ${BorderColor};
//   cursor: pointer;

//   @media (min-width: 768px) {
//     border-radius: 2rem;
//     height: 450px; /* full height for desktop */
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//   }

//   .overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.15) 60%, transparent 100%);
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     padding: 1.25rem;
//     transition: background 0.4s ease;

//     @media (min-width: 768px) {
//       padding: 2.5rem;
//     }
//   }

//   h4 {
//     color: #ffffff;
//     font-size: 1.05rem;
//     font-weight: 800;
//     margin-bottom: 0.35rem;
//     letter-spacing: -0.01em;

//     @media (min-width: 768px) {
//       font-size: 1.5rem;
//       margin-bottom: 0.5rem;
//     }
//   }

//   p {
//     color: #cbd5e1;
//     font-size: 0.8rem;
//     font-weight: 500;
//     margin: 0;
//     display: -webkit-box;
//     -webkit-line-clamp: 2; /* limits description text neatly if needed */
//     -webkit-box-orient: vertical;
//     overflow: hidden;

//     @media (min-width: 768px) {
//       font-size: 1rem;
//       -webkit-line-clamp: unset;
//     }
//   }

//   &:hover {
//     img {
//       transform: scale(1.12);
//     }
//     .overlay {
//       background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(0, 174, 239, 0.35) 100%);
//     }
//   }
// `;

// export default function GallerySection() {
//     const router = useRouter()
//   return (
//     <SectionContainer>
//       <SectionHeader>
//         <div className="badge-pill">
//           <Star className="w-4 h-4 text-cyan-500" /> Explore Catalog
//         </div>
//         <h2>Our Core Categories</h2>
//         <p>Discover thoughtfully chosen personal, household, and lifestyle merchandise tailored to your everyday needs.</p>
//       </SectionHeader>

//       <GalleryGrid>
//         <GalleryCard  onClick={()=>router.push(`/categories/oWDAeSyxUBNICq1TZtp6`)}>
//           <img src="./h3.png" alt="Personal Products" />
//           <div className="overlay">
//             <h4>New Arrivals</h4>
//             <p>Explore our New Arrivals</p>
//           </div>
//         </GalleryCard>

//         <GalleryCard onClick={()=>router.push(`/categories/HXEy3XhgQJgtJ1fJUgxP`)}>
//           <img src="./h4.png" alt="Household Goods" />
//           <div className="overlay">
//             <h4>Best 
//                 Sellers
//             </h4>
//             <p>Explore our Best Sellers</p>
//           </div>
//         </GalleryCard>

//         {/* <GalleryCard>
//           <img src="./h2.png" alt="Lifestyle Collection" />
//           <div className="overlay">
//             <h4>Lifestyle Collection</h4>
//             <p>Quality merchandise with seamless ordering</p>
//           </div>
//         </GalleryCard> */}
//       </GalleryGrid>
//     </SectionContainer>
//   );
// }



"use client";

import React from "react";
import styled from "styled-components";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

/* ================= THEME STYLES (MAJINFOTEK) ================= */
const primaryBlue = '#1c3ba4';
const richPurple = '#8b5cf6';
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%, #8b5cf6 100%)";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

/* ================= STYLED COMPONENTS ================= */

const SectionContainer = styled.section`
  padding: 5rem 1rem;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 7rem 1.5rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 52rem;
  margin: 0 auto 3.5rem auto;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(28, 59, 164, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 9999px;
    color: ${primaryBlue};
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: ${TextPrimary};
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.7;
    @media (min-width: 768px) { font-size: 1.15rem; }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 cards per row on mobile */
  gap: 12px; /* tighter spacing for mobile */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row on desktop */
    gap: 2rem;
  }
`;

const GalleryCard = styled.div`
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  height: 200px; /* compact height for mobile 2-column view */
  box-shadow: 0 15px 30px rgba(15, 23, 42, 0.06);
  border: 1px solid ${BorderColor};
  cursor: pointer;

  @media (min-width: 768px) {
    border-radius: 2rem;
    height: 450px; /* full height for desktop */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.15) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem;
    transition: background 0.4s ease;

    @media (min-width: 768px) {
      padding: 2.5rem;
    }
  }

  h4 {
    color: #ffffff;
    font-size: 1.05rem;
    font-weight: 800;
    margin-bottom: 0.35rem;
    letter-spacing: -0.01em;

    @media (min-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    color: #cbd5e1;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* limits description text neatly if needed */
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (min-width: 768px) {
      font-size: 1rem;
      -webkit-line-clamp: unset;
    }
  }

  &:hover {
    img {
      transform: scale(1.12);
    }
    .overlay {
      background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(139, 92, 246, 0.4) 100%);
    }
  }
`;

export default function GallerySection() {
    const router = useRouter();
    
  return (
    <SectionContainer>
      <SectionHeader>
        <div className="badge-pill">
          <Star className="w-4 h-4 text-purple-600" /> Explore Catalog
        </div>
        <h2>Our Core Categories</h2>
        <p>Discover high-performance surveillance kits, smart intercoms, and advanced security gadgets engineered for total protection.</p>
      </SectionHeader>

      <GalleryGrid>
        <GalleryCard onClick={() => router.push(`/categories/l274LoSBWs1e5DIR1P4b`)}>
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000" 
            alt="New Security Arrivals" 
          />
          <div className="overlay">
            <h4>New Arrivals</h4>
            <p>Explore our latest high-definition CCTV systems and tech equipment</p>
          </div>
        </GalleryCard>

        <GalleryCard onClick={() => router.push(`/categories/r0EcdsyXrHGuBYyfSRIR`)}>
          <img 
            src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1000" 
            alt="Best Sellers" 
          />
          <div className="overlay">
            <h4>Best Sellers</h4>
            <p>Explore our most trusted intercom solutions and security hardware</p>
          </div>
        </GalleryCard>
      </GalleryGrid>
    </SectionContainer>
  );
}