

// "use client";

// import { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { db, auth } from "@/firebaseConfig";
// import { collection, getDocs, doc, setDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import Swal from "sweetalert2";
// import ProductCard from "@/components/ProductCard";
// import SearchBar from "./SearchBar";

// /* ================= THEME & COLORS ================= */

// const brandCyan = '#00aeef';
// const brandDarkNavy = '#0b1b48';
// const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
// const cardBg = '#ffffff';
// const borderColor = '#e2e8f0';
// const textMain = '#0f172a';
// const textMuted = '#475569';
// const softBg = '#f8fafc';
// const successGreen = '#10b981';
// const dangerRed = '#ef4444';

// const floatAnimation = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-4px) rotate(1deg); }
//   100% { transform: translateY(0px) rotate(0deg); }
// `;

// /* ================= STYLED COMPONENTS ================= */

// const PageContainer = styled.div`
//   font-family: inherit;
//   color: ${textMain};
//   background: ${cardBg};
//   overflow-x: hidden;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   min-height: 100vh;
//   padding-bottom: 60px;
// `;

// const StoreHero = styled.section`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   background: ${textMain};
//   overflow: hidden;

//   &::after {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background: rgba(11, 27, 72, 0.75);
//     z-index: 1;
//   }
// `;

// const HeroImage = styled.img`
//   position: absolute;
//   inset: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   z-index: 0;
// `;

// const HeroContent = styled.div`
//   position: relative;
//   z-index: 2;
//   max-width: 800px;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   align-items: center;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const HeroTitle = styled.h1`
//   font-size: clamp(2rem, 3.5vw, 2.75rem);
//   font-weight: 800;
//   color: #ffffff;
//   letter-spacing: -0.5px;
//   margin: 0;
// `;

// const HeroSubtitle = styled.p`
//   font-size: clamp(0.95rem, 1.8vw, 1.15rem);
//   color: #e2e8f0;
//   line-height: 1.6;
//   margin: 0;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   max-width: 500px;
//   padding: 14px 20px;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 1rem;
//   font-weight: 500;
//   outline: none;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//   transition: all 0.25s ease;

//   &::placeholder {
//     color: ${textMuted};
//   }

//   &:focus {
//     border-color: ${brandCyan};
//     box-shadow: 0 10px 35px rgba(0, 174, 239, 0.2);
//   }
// `;

// const StoreLayout = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 24px 16px;
//   display: grid;
//   grid-template-columns: 260px 1fr;
//   gap: 32px;
//   align-items: start;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr;
//     gap: 20px;
//   }
// `;

// const Sidebar = styled.aside`
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 16px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

//   @media (max-width: 968px) {
//     padding: 12px;
//     background: transparent;
//     border: none;
//     box-shadow: none;
//   }
// `;

// const SidebarTitle = styled.h3`
//   font-size: 1.15rem;
//   font-weight: 800;
//   color: ${textMain};
//   border-bottom: 1px solid ${borderColor};
//   padding-bottom: 12px;
//   margin: 0;
// `;

// const CategoryList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;

//   @media (max-width: 968px) {
//     display: none;
//   }
// `;

// const CategoryButton = styled.button`
//   background: ${(props) => (props.$active ? brandGradient : 'transparent')};
//   color: ${(props) => (props.$active ? '#ffffff' : textMain)};
//   border: 1px solid ${(props) => (props.$active ? 'transparent' : borderColor)};
//   padding: 12px 16px;
//   border-radius: 10px;
//   text-align: left;
//   font-size: 0.95rem;
//   font-weight: ${(props) => (props.$active ? '700' : '600')};
//   cursor: pointer;
//   transition: all 0.2s ease;
//   white-space: nowrap;
//   box-shadow: ${(props) => (props.$active ? '0 4px 15px rgba(0, 174, 239, 0.25)' : 'none')};

//   &:hover {
//     background: ${(props) => (props.$active ? brandGradient : softBg)};
//     border-color: ${(props) => (props.$active ? 'transparent' : brandCyan)};
//     color: ${(props) => (props.$active ? '#ffffff' : brandCyan)};
//   }
// `;

// const ProductsWrapper = styled.main`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const StoreControls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 14px;
//   padding: 16px 20px;
//   box-sizing: border-box;

//   @media (max-width: 576px) {
//     flex-direction: column;
//     gap: 12px;
//     align-items: stretch;
//   }
// `;

// const ResultsCount = styled.p`
//   font-size: 0.95rem;
//   color: ${textMuted};
//   font-weight: 600;
//   margin: 0;

//   span {
//     color: ${textMain};
//     font-weight: 800;
//   }
// `;

// const SortSelect = styled.select`
//   padding: 10px 14px;
//   border-radius: 10px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 0.9rem;
//   font-weight: 600;
//   outline: none;
//   cursor: pointer;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

//   &:focus {
//     border-color: ${brandCyan};
//   }
// `;

// const ProductsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//   gap: 20px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//   }
// `;

// const MobileCategorySelect = styled.select`
//   display: none;
//   width: 100%;
//   padding: 12px 16px;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 0.95rem;
//   font-weight: 600;
//   outline: none;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

//   &:focus {
//     border-color: ${brandCyan};
//   }

//   @media (max-width: 968px) {
//     display: block;
//   }
// `;

// /* ================= COMPONENT ================= */

// export default function MainStoreComponent() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategoryId, setActiveCategoryId] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState([]);

//   // Helper to get category title by ID
//   const getCategoryName = (catId) => {
//     const found = categories.find((c) => c.id === catId);
//     return found ? found.title : "";
//   };

//   // Real-time listener for products and categories
//   useEffect(() => {
//     setLoading(true);

//     const unsubscribeProducts = onSnapshot(
//       collection(db, "products"),
//       (productsSnapshot) => {
//         const fetchedProducts = productsSnapshot.docs
//           .map((doc) => {
//             const data = doc.data();
//             let catIds = data.categoryIds || [];
//             if (catIds.length === 0 && data.categoryId) {
//               catIds = [data.categoryId];
//             }

//             return {
//               id: doc.id,
//               name: data.name || "Untitled Product",
//               categoryIds: catIds,
//               categoryId: data.categoryId || "",
//               amount: Number(data.amount) || 0,
//               images: data.images || [],
//               image: data.image || "",
//               variations: data.variations || [],
//               createdAt: data.createdAt,
//               isLive: data.isLive === true,
//             };
//           })
//           .filter((product) => product.isLive);

//         setProducts(fetchedProducts);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error listening to products:", error);
//         setLoading(false);
//       }
//     );

//     const unsubscribeCategories = onSnapshot(
//       collection(db, "categories"),
//       (categoriesSnapshot) => {
//         const fetchedCategories = categoriesSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             title: data.title || "Untitled Category",
//             description: data.description || "",
//           };
//         });

//         setCategories(fetchedCategories);
//       },
//       (error) => {
//         console.error("Error listening to categories:", error);
//       }
//     );

//     return () => {
//       unsubscribeProducts();
//       unsubscribeCategories();
//     };
//   }, []);

//   // Filter products by active category ID and search query
//   const filteredProducts = products.filter((item) => {
//     const itemCats = item.categoryIds || (item.categoryId ? [item.categoryId] : []);
//     const matchesCategory =
//       activeCategoryId === "all" || itemCats.includes(activeCategoryId);
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "price-low") return a.amount - b.amount;
//     if (sortBy === "price-high") return b.amount - a.amount;
//     if (sortBy === "title") return a.name.localeCompare(b.name);
//     return 0;
//   });

//   // Listen to authenticated user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Fetch user's wishlist IDs
//   useEffect(() => {
//     async function fetchUserWishlist() {
//       if (!currentUser) {
//         setWishlistIds([]);
//         return;
//       }
//       try {
//         const q = query(collection(db, "wishlists"), where("userId", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const ids = querySnapshot.docs.map(docSnap => docSnap.data().productId);
//         setWishlistIds(ids);
//       } catch (error) {
//         console.error("Error fetching wishlist IDs:", error);
//       }
//     }
//     fetchUserWishlist();
//   }, [currentUser]);

//   // Toggle wishlist handler
//   const handleToggleWishlist = async (e, productId) => {
//     e.stopPropagation();

//     if (!currentUser) {
//       Swal.fire({
//         title: "Please Login",
//         text: "Please log in to manage your wishlist.",
//         icon: "warning",
//         confirmButtonColor: "#00aeef",
//         background: "#ffffff",
//         color: "#0f172a"
//       });
//       return;
//     }

//     const isCurrentlyWishlisted = wishlistIds.includes(productId);
//     const wishlistDocId = `${currentUser.uid}_${productId}`;
//     const wishlistRef = doc(db, "wishlists", wishlistDocId);

//     if (isCurrentlyWishlisted) {
//       setWishlistIds(wishlistIds.filter(id => id !== productId));
//     } else {
//       setWishlistIds([...wishlistIds, productId]);
//     }

//     try {
//       if (isCurrentlyWishlisted) {
//         await deleteDoc(wishlistRef);
//         Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//       } else {
//         await setDoc(wishlistRef, {
//           userId: currentUser.uid,
//           productId: productId,
//           addedAt: new Date()
//         });
//         Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       if (isCurrentlyWishlisted) {
//         setWishlistIds([...wishlistIds, productId]);
//       } else {
//         setWishlistIds(wishlistIds.filter(id => id !== productId));
//       }
//       Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//     }
//   };

//   return (
//     <PageContainer>
//       {/* <StoreHero>
//         <HeroImage src="./shop.png" alt="Store Hero Banner" />
//         <HeroContent>
//           <HeroTitle>Shop Our Products</HeroTitle>
//           <HeroSubtitle>
//             Explore premium accessories, bespoke products, and quality items designed to elevate your lifestyle.
//           </HeroSubtitle>
//           <SearchInput
//             type="text"
//             placeholder="Search products by name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </HeroContent>
//       </StoreHero> */}
//       <div style={{paddingTop:"50px"}}>
// <SearchBar/>
//       </div>

//       <StoreLayout>
//         <Sidebar>
//           <SidebarTitle>Categories</SidebarTitle>

//           <MobileCategorySelect
//             value={activeCategoryId}
//             onChange={(e) => setActiveCategoryId(e.target.value)}
//           >
//             <option value="all">All Items</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
//               </option>
//             ))}
//           </MobileCategorySelect>

//           <CategoryList>
//             <CategoryButton
//               $active={activeCategoryId === "all"}
//               onClick={() => setActiveCategoryId("all")}
//             >
//               All Items
//             </CategoryButton>

//             {categories.map((cat) => (
//               <CategoryButton
//                 key={cat.id}
//                 $active={activeCategoryId === cat.id}
//                 onClick={() => setActiveCategoryId(cat.id)}
//               >
//                 {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
//               </CategoryButton>
//             ))}
//           </CategoryList>
//         </Sidebar>

//         <ProductsWrapper>
//           <StoreControls>
//             <ResultsCount>
//               Showing <span>{sortedProducts.length}</span> curated items
//             </ResultsCount>
//             <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="featured">Sort by: Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="title">Name: A to Z</option>
//             </SortSelect>
//           </StoreControls>

//           <ProductsGrid>
// {sortedProducts.map((product) => (
//   <ProductCard
//     key={product.id}
//     product={product}
//     isWishlisted={wishlistIds.includes(product.id)}
//     onToggleWishlist={handleToggleWishlist}
//     getCategoryName={getCategoryName}
//   />
// ))}
//           </ProductsGrid>
//         </ProductsWrapper>
//       </StoreLayout>
//     </PageContainer>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebaseConfig";
import { collection, getDocs, doc, setDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import ProductCard from "@/components/ProductCard";
import SearchBar from "./SearchBar";
import ShopByCategory from "./ShopByCategory";
import ShopByLocation from "./ShopByLocation";
import FeaturedProducts from "./FeaturedProducts";




/* ================= THEME STYLES (MAJINFOTEK) ================= */
const primaryBlue = "#1c3ba4";
const richPurple = "#8b5cf6";
const brandGradient = "linear-gradient(135deg, #1c3ba4 0%, #8b5cf6 100%)";
const cardBg = "#ffffff";
const borderColor = "rgba(226, 232, 240, 0.9)";
const textMain = "#0f172a";
const textMuted = "#475569";
const softBg = "#f8fafc";
const successGreen = "#10b981";
const dangerRed = "#ef4444";

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

/* ================= STYLED COMPONENTS ================= */

const PageContainer = styled.div`
  font-family: inherit;
  color: ${textMain};
  background: ${cardBg};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const StoreHero = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${textMain};
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.85);
    z-index: 1;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin: 0;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  color: #e2e8f0;
  line-height: 1.6;
  margin: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;

  &::placeholder {
    color: ${textMuted};
  }

  &:focus {
    border-color: ${richPurple};
    box-shadow: 0 10px 35px rgba(139, 92, 246, 0.25);
  }
`;

const StoreLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 24px 16px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Sidebar = styled.aside`
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  @media (max-width: 968px) {
    padding: 12px;
    background: transparent;
    border: none;
    box-shadow: none;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: ${textMain};
  border-bottom: 1px solid ${borderColor};
  padding-bottom: 12px;
  margin: 0;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const CategoryButton = styled.button`
  background: ${(props) => (props.$active ? brandGradient : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : textMain)};
  border: 1px solid ${(props) => (props.$active ? "transparent" : borderColor)};
  padding: 12px 16px;
  border-radius: 10px;
  text-align: left;
  font-size: 0.95rem;
  font-weight: ${(props) => (props.$active ? "700" : "600")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: ${(props) => (props.$active ? "0 4px 15px rgba(139, 92, 246, 0.3)" : "none")};

  &:hover {
    background: ${(props) => (props.$active ? brandGradient : softBg)};
    border-color: ${(props) => (props.$active ? "transparent" : richPurple)};
    color: ${(props) => (props.$active ? "#ffffff" : richPurple)};
  }
`;

const ProductsWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const StoreControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 14px;
  padding: 16px 20px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const ResultsCount = styled.p`
  font-size: 0.95rem;
  color: ${textMuted};
  font-weight: 600;
  margin: 0;

  span {
    color: ${textMain};
    font-weight: 800;
  }
`;

const SortSelect = styled.select`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  &:focus {
    border-color: ${richPurple};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const MobileCategorySelect = styled.select`
  display: none;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 0.95rem;
  font-weight: 600;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:focus {
    border-color: ${richPurple};
  }

  @media (max-width: 968px) {
    display: block;
  }
`;

const TopCategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const CategoriesScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: ${richPurple} transparent;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${borderColor};
    border-radius: 4px;
  }
`;

const TopCategoryButton = styled.button`
  background: ${(props) => (props.$active ? brandGradient : softBg)};
  color: ${(props) => (props.$active ? "#ffffff" : textMain)};
  border: 1px solid ${(props) => (props.$active ? "transparent" : borderColor)};
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: ${(props) => (props.$active ? "700" : "600")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: ${(props) => (props.$active ? "0 4px 15px rgba(139, 92, 246, 0.3)" : "none")};

  &:hover {
    background: ${(props) => (props.$active ? brandGradient : "#f1f5f9")};
    border-color: ${(props) => (props.$active ? "transparent" : richPurple)};
    color: ${(props) => (props.$active ? "#ffffff" : richPurple)};
  }
`;



/* ================= COMPONENT ================= */

export default function MainStoreComponent() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  // console.log(products)

  

  // Helper to get category title by ID
  const getCategoryName = (catId) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.title : "";
  };

  // Real-time listener for products and categories
  useEffect(() => {
    setLoading(true);

    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (productsSnapshot) => {
        const fetchedProducts = productsSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            let catIds = data.categoryIds || [];
            if (catIds.length === 0 && data.categoryId) {
              catIds = [data.categoryId];
            }

            return {
              id: doc.id,
              name: data.name || "Untitled Product",
              categoryIds: catIds,
              categoryId: data.categoryId || "",
              amount: Number(data.amount) || 0,
              images: data.images || [],
              image: data.image || "",
              variations: data.variations || [],
              createdAt: data.createdAt,
              isLive: data.isLive === true,
              strikeAmount:data.strikeAmount,
            };
          })
          .filter((product) => product.isLive);

        setProducts(fetchedProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to products:", error);
        setLoading(false);
      }
    );

    const unsubscribeCategories = onSnapshot(
      collection(db, "categories"),
      (categoriesSnapshot) => {
        const fetchedCategories = categoriesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Category",
            description: data.description || "",
          };
        });

        setCategories(fetchedCategories);
      },
      (error) => {
        console.error("Error listening to categories:", error);
      }
    );

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  // Filter products by active category ID and search query
  const filteredProducts = products.filter((item) => {
    const itemCats = item.categoryIds || (item.categoryId ? [item.categoryId] : []);
    const matchesCategory =
      activeCategoryId === "all" || itemCats.includes(activeCategoryId);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.amount - b.amount;
    if (sortBy === "price-high") return b.amount - a.amount;
    if (sortBy === "title") return a.name.localeCompare(b.name);
    return 0;
  });

  // Listen to authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's wishlist IDs
  useEffect(() => {
    async function fetchUserWishlist() {
      if (!currentUser) {
        setWishlistIds([]);
        return;
      }
      try {
        const q = query(collection(db, "wishlists"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ids = querySnapshot.docs.map(docSnap => docSnap.data().productId);
        setWishlistIds(ids);
      } catch (error) {
        console.error("Error fetching wishlist IDs:", error);
      }
    }
    fetchUserWishlist();
  }, [currentUser]);

  // Toggle wishlist handler
  const handleToggleWishlist = async (e, productId) => {
    e.stopPropagation();

    if (!currentUser) {
      Swal.fire({
        title: "Please Login",
        text: "Please log in to manage your wishlist.",
        icon: "warning",
        confirmButtonColor: "#00aeef",
        background: "#ffffff",
        color: "#0f172a"
      });
      return;
    }

    const isCurrentlyWishlisted = wishlistIds.includes(productId);
    const wishlistDocId = `${currentUser.uid}_${productId}`;
    const wishlistRef = doc(db, "wishlists", wishlistDocId);

    if (isCurrentlyWishlisted) {
      setWishlistIds(wishlistIds.filter(id => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }

    try {
      if (isCurrentlyWishlisted) {
        await deleteDoc(wishlistRef);
        Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
      } else {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          productId: productId,
          addedAt: new Date()
        });
        Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      if (isCurrentlyWishlisted) {
        setWishlistIds([...wishlistIds, productId]);
      } else {
        setWishlistIds(wishlistIds.filter(id => id !== productId));
      }
      Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
    }
  };


  const handleCategoryClick = (catId) => {
    setActiveCategoryId(catId);
    const storeElement = document.getElementById("store");
    if (storeElement) {
      storeElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageContainer id='store'>
      <StoreHero>
        <HeroImage src="./shop.png" alt="Store Hero Banner" />
        <HeroContent>
          <HeroTitle>Shop Our Products</HeroTitle>
     
        </HeroContent>
      </StoreHero>
     {/* <div style={{ paddingTop: "5px", display: "flex", flexDirection: "column", gap: "20px", paddingLeft:"10px", paddingRight:'10px' }}> */}
        {/* Top Scrollable Categories Bar */}
   {/* Top Scrollable Categories Bar */}
        <TopCategoriesContainer>
          <CategoriesScrollWrapper>
            <TopCategoryButton
              as="a"
              href="#store"
              $active={activeCategoryId === "all"}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick("all");
              }}
            >
              All Items
            </TopCategoryButton>

            {categories.map((cat) => (
              <TopCategoryButton
                key={cat.id}
                as="a"
                href="#store"
                $active={activeCategoryId === cat.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(cat.id);
                }}
              >
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </TopCategoryButton>
            ))}
          </CategoriesScrollWrapper>
        </TopCategoriesContainer>

        {/* Search Bar Component */}
        <SearchBar />
      {/* </div> */}
      {/* <FeaturedProducts/> */}
{/* <ShopByLocation/> */}
      <StoreLayout>

        <Sidebar>
          <SidebarTitle>Categories</SidebarTitle>

          <MobileCategorySelect
            value={activeCategoryId}
            onChange={(e) => setActiveCategoryId(e.target.value)}
          >
            <option value="all">All Items</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </option>
            ))}
          </MobileCategorySelect>

          <CategoryList>
            <CategoryButton
              $active={activeCategoryId === "all"}
              onClick={() => setActiveCategoryId("all")}
            >
              All Items
            </CategoryButton>

            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                $active={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </CategoryButton>
            ))}
          </CategoryList>
        </Sidebar>

        <ProductsWrapper>
          <StoreControls>
            <ResultsCount>
              Showing <span>{sortedProducts.length}</span> curated items
            </ResultsCount>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name: A to Z</option>
            </SortSelect>
          </StoreControls>

          <ProductsGrid>
{sortedProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    isWishlisted={wishlistIds.includes(product.id)}
    onToggleWishlist={handleToggleWishlist}
    getCategoryName={getCategoryName}
  />
))}
          </ProductsGrid>
        </ProductsWrapper>
      </StoreLayout>
    </PageContainer>
  );
}