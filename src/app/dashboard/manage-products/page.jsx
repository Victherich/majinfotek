
"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// 🎨 UPDATED THEME COLORS
const PrimaryNavy = "#1c3ba4";
const PrimaryCyan = " #8b5cf6";
const ThemeGradient = "linear-gradient(135deg, #1c3ba4 0%,  #8b5cf6 100%)";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const Danger = "#ef4444";
const Success = "#22c55e";


// 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${Dark};
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${LightBg};
  min-height: 100vh;
`;

const HeaderBanner = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(11, 27, 72, 0.15);
`;

const ColorfulTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  margin: 0;
  color: ${White};
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ColorfulSub = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: #f8fafc;
  opacity: 0.95;
  font-weight: 500;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px 0 0 0;
  flex-wrap: wrap;
`;

const ColorfulSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SearchInput = styled.input`
  border: 1px solid ${Border};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 240px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: ${White};
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const PrimaryButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(0, 174, 239, 0.3);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.45);
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const ProductCard = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  border-left: 4px solid ${PrimaryNavy};
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  
  width: 100%;
  max-width: 250px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 174, 239, 0.4);
    box-shadow: 0 10px 25px rgba(0, 174, 239, 0.12);
  }

  @media (max-width: 768px) {
    padding: 8px;
    gap: 6px;
    max-width: calc(50% - 2px); 
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${Dark};
`;

const ProductAmount = styled.span`
  font-size: 0.95rem;
  font-weight: 800;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProductStock = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${TextMuted};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap:wrap;
  margin-top: auto;
  align-items: center;
`;

const EditButton = styled.button`
  background: rgba(0, 174, 239, 0.1);
  color: #0284c7;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 174, 239, 0.2);
  }
`;

const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: ${Danger};
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const LoadingContainer = styled.div`
  padding: 10px;
  text-align: center;
  color: ${TextMuted};
  font-weight: 600;
`;

// 🌟 Custom Modal Components (Max 10px limit)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${Border};
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledInput = styled.input`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: ${White};

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const StyledTextarea = styled.textarea`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 60px;
  margin: 0;
  background: ${White};

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${TextMuted};
  cursor: pointer;
  margin: 0;
`;

// 🌟 Custom Styled 4-Slot Image Upload Grid
const ImageSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ImageSlotCard = styled.div`
  background: #f8fafc;
  border: 1px dashed ${Border};
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
  min-height: 100px;
  box-sizing: border-box;
`;

const SlotLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${TextMuted};
  text-align: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButtonLabel = styled.label`
  background: ${ThemeGradient};
  color: ${White};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 174, 239, 0.25);

  &:hover {
    opacity: 0.9;
  }
`;

const SlotPreviewWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${Border};
`;

const RemoveSlotButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(239, 68, 68, 0.9);
  color: ${White};
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background: ${Danger};
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 5px;
`;

const CancelButton = styled.button`
  background: ${Border};
  color: ${TextMuted};
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #cbd5e1;
  }
`;

const SaveButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 174, 239, 0.3);

  &:hover {
    opacity: 0.9;
  }
`;

const ProductcategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #0284c7;
  background: rgba(0, 174, 239, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
  width: fit-content;
  border: 1px solid rgba(0, 174, 239, 0.2);
`;

// 🌟 Toggle Switch Styles
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
  user-select: none;
`;

const ToggleLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${Dark};
`;

const ToggleSwitchBox = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${(props) => (props.$isChecked ? Success : Border)};
  border-radius: 12px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
`;

const ToggleThumb = styled.div`
  width: 20px;
  height: 20px;
  background: ${White};
  border-radius: 50%;
  transform: translateX(${(props) => (props.$isChecked ? "20px" : "0px")});
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;



// 🔹 Compression utility function
const compressImage = (file, maxSizeKB = 100) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scaleSize = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.7;

        const compressLoop = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Compression failed"));

              const sizeKB = blob.size / 1024;
              if (sizeKB <= maxSizeKB || quality <= 0.1) {
                resolve(blob);
              } else {
                quality -= 0.1;
                compressLoop();
              }
            },
            "image/jpeg",
            quality
          );
        };

        compressLoop();
      };

      img.onerror = () => reject(new Error("Image load failed"));
    };

    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });
};


// --- HELPER FUNCTION ---
const createSlug = (name, id) => {
  const cleanName = (name || "product")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${cleanName}-${id}`;
};



export default function ProductsCrudPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");

  // Modal State Controls
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form states
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    strikeAmount: "",
    quantity: "",
    neverFinishes: false,
    categoryIds: [],
    isLive: true,
    pricingType: "single", // "single" or "tiered"
   locationIds: [],
  });

  // 4 individual slots for files and previews
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState(["", "", "", ""]);
  const [existingImageUrls, setExistingImageUrls] = useState(["", "", "", ""]);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Variations, Features, Tiered Pricing, and YouTube Links States
  const [variations, setVariations] = useState([]); 
  const [featuresText, setFeaturesText] = useState(""); 
  const [priceTiers, setPriceTiers] = useState([{ minQty: 1, maxQty: 1, price: "" }]);
  const [youtubeLinksText, setYoutubeLinksText] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(list);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch locations from Firestore
  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(list);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };



  useEffect(() => {
    fetchProducts();
    fetchCategories();
      fetchLocations(); 
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch products.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(newPreviews);

    const newExisting = [...existingImageUrls];
    newExisting[index] = "";
    setExistingImageUrls(newExisting);

    e.target.value = "";
  };

  const handleRemoveSlot = (index) => {
    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = "";
    setImagePreviews(newPreviews);

    const newExisting = [...existingImageUrls];
    newExisting[index] = "";
    setExistingImageUrls(newExisting);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || (form.pricingType === "single" && !form.amount)) {
        return Swal.fire({
          icon: "warning",
          text: "Please provide product name and base amount.",
        });
      }

     if (form.pricingType === "singleqtytiered" && (priceTiers.length === 0 || priceTiers.some(t => !t.minQty || !t.price))) {
  return Swal.fire({
    icon: "warning",
    text: "Please provide both quantity and price for all single quantity tiers.",
  });
}

      if (form.pricingType === "tiered" && priceTiers.length === 0) {
        return Swal.fire({
          icon: "warning",
          text: "Please add at least one price tier range.",
        });
      }

      if (!form.categoryIds || form.categoryIds.length === 0) {
        return Swal.fire({
          icon: "warning",
          text: "Please select at least one category for this product.",
        });
      }

// 🌟 Validation: Ensure at least one location is selected
if (!form.locationIds || form.locationIds.length === 0) {
  return Swal.fire({
    icon: "warning",
    text: "Please select at least one location for this product.",
  });
}

      if (!imageFiles[0] && !existingImageUrls[0]) {
        return Swal.fire({
          icon: "warning",
          text: "The first image is compulsory. Please select an image for Slot 1.",
        });
      }

      Swal.fire({
        text: "Processing...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      let finalImageUrls = [];

      for (let i = 0; i < 4; i++) {
        if (imageFiles[i]) {
          const compressedBlob = await compressImage(imageFiles[i], 100);

          const data = new FormData();
          data.append("file", compressedBlob, `product_${i}.jpg`);
          data.append("upload_preset", "bees_interior");
          data.append("folder", "products_majinfotek");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/aqxyleoh/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.error?.message || `Image upload failed for slot ${i + 1}`);
          }

          finalImageUrls.push(result.secure_url);
        } else if (existingImageUrls[i]) {
          finalImageUrls.push(existingImageUrls[i]);
        }
      }

      const featuresList = featuresText
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const youtubeLinksList = youtubeLinksText
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // const formattedTiers = priceTiers.map(tier => ({
      //   minQty: Number(tier.minQty || 1),
      //   maxQty: tier.maxQty ? Number(tier.maxQty) : null,
      //   price: Number(tier.price || 0)
      // }));

      const formattedTiers = form.pricingType === "singleqtytiered" 
  ? priceTiers.map(tier => ({
      minQty: Number(tier.minQty || 1),
      maxQty: Number(tier.minQty || 1), // Exact match quantity
      price: Number(tier.price || 0)
    }))
  : form.pricingType === "tiered" 
  ? priceTiers.map(tier => ({
      minQty: Number(tier.minQty || 1),
      maxQty: tier.maxQty ? Number(tier.maxQty) : null,
      price: Number(tier.price || 0)
    }))
  : [];

    

      const payload = {
        name: form.name,
        description: form.description,
        pricingType: form.pricingType,
        amount: form.pricingType === "single" ? Number(form.amount) : Number(formattedTiers[0]?.price || 0),
        priceTiers: form.pricingType === "single" ? [] : formattedTiers,
        strikeAmount: form.strikeAmount ? Number(form.strikeAmount) : 0, // 🌟 Save strike amount
        quantity: form.neverFinishes ? 0 : Number(form.quantity || 0),
        neverFinishes: form.neverFinishes,
        images: finalImageUrls,
        image: finalImageUrls[0] || "",
        categoryIds: form.categoryIds,
        categoryId: form.categoryIds[0] || "",
        isLive: form.isLive,
        variations: variations.filter((v) => v.name.trim() !== "" && v.options.trim() !== ""),
        features: featuresList,
        youtubeLinks: youtubeLinksList,
        locationIds: form.locationIds, // 🌟 Save multiple location IDs array
  locationId: form.locationIds[0] || "", // Optional fallback for single location dependencies
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Saved!",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowModal(false);
      setForm({ name: "", description: "", amount: "", quantity: "", neverFinishes: false, categoryIds: [], isLive: true, pricingType: "single", locationIds: [], });
      setImageFiles([null, null, null, null]);
      setImagePreviews(["", "", "", ""]);
      setExistingImageUrls(["", "", "", ""]);
      setEditingId(null);
      setVariations([]);
      setFeaturesText("");
      setPriceTiers([{ minQty: 1, maxQty: 1, price: "" }]);
      setYoutubeLinksText("");
      fetchProducts();

    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.message || "Try again.",
      });
    }
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    const itemImages = item.images || (item.image ? [item.image] : []);

    let loadedCategories = item.categoryIds || [];
    if (loadedCategories.length === 0 && (item.categoryId || item.category)) {
      loadedCategories = [item.categoryId || item.category];
    }

    // 🌟 Load locations with backward compatibility fallback
  let loadedLocations = item.locationIds || [];
  if (loadedLocations.length === 0 && (item.locationId || item.location)) {
    loadedLocations = [item.locationId || item.location];
  }
    
    setForm({
      name: item.name || "",
      description: item.description || "",
      amount: item.pricingType === "single" ? (item.amount || "") : "",
      strikeAmount: item.strikeAmount || "", // 🌟 Load existing strike-through price
      quantity: item.quantity || "",
      neverFinishes: item.neverFinishes || false,
      categoryIds: loadedCategories,
      isLive: item.isLive ?? true,
      pricingType: item.pricingType || "single",
    locationIds: loadedLocations, 
    });
    setEditingId(item.id);

    const slotUrls = ["", "", "", ""];
    const slotPreviews = ["", "", "", ""];
    itemImages.forEach((url, idx) => {
      if (idx < 4) {
        slotUrls[idx] = url;
        slotPreviews[idx] = url;
      }
    });

    setExistingImageUrls(slotUrls);
    setImagePreviews(slotPreviews);
    setImageFiles([null, null, null, null]);
    setShowModal(true);
    setVariations(item.variations || []);
    setFeaturesText(item.features ? item.features.join("\n") : "");
    // setPriceTiers(item.priceTiers && item.priceTiers.length > 0 ? item.priceTiers : [{ minQty: 1, maxQty: 1, price: item.amount || "" }]);
   setPriceTiers(
    item.priceTiers && item.priceTiers.length > 0 
      ? item.priceTiers 
      : [{ minQty: 1, maxQty: 1, price: item.amount || "" }]
  );
    setYoutubeLinksText(item.youtubeLinks ? item.youtubeLinks.join("\n") : "");
  };

  const handleAddVariation = () => {
    setVariations([...variations, { name: "", options: "" }]);
  };

  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const handleRemoveVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleAddTier = () => {
    setPriceTiers([...priceTiers, { minQty: "", maxQty: "", price: "" }]);
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...priceTiers];
    updated[index][field] = value;
    setPriceTiers(updated);
  };

  const handleRemoveTier = (index) => {
    setPriceTiers(priceTiers.filter((_, i) => i !== index));
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Danger,
      cancelButtonColor: TextMuted,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "products", id));
      Swal.fire("Deleted!", "", "success");
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", "Could not delete product.", "error");
    }
  };

  const handleToggleLive = async (item, e) => {
    e.stopPropagation();
    const updatedStatus = !item.isLive;
    
    setProducts(products.map(p => p.id === item.id ? { ...p, isLive: updatedStatus } : p));

    try {
      await updateDoc(doc(db, "products", item.id), {
        isLive: updatedStatus
      });
    } catch (error) {
      setProducts(products.map(p => p.id === item.id ? { ...p, isLive: item.isLive } : p));
      Swal.fire("Error", "Could not update product status.", "error");
    }
  };

  // const filteredData = products
  //   .filter((item) => {
  //     const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
  //     const itemCats = item.categoryIds || (item.categoryId ? [item.categoryId] : []);
  //     const matchesCategory = selectedCategory === "" || itemCats.includes(selectedCategory);
  //     return matchesSearch && matchesCategory;
  //   })
  const filteredData = products
  .filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase());
    
    const itemCats = item.categoryIds || (item.categoryId ? [item.categoryId] : []);
    const matchesCategory = selectedCategory === "" || itemCats.includes(selectedCategory);
    
    // 🌟 Check if product's locationIds array includes the selected filter location
    const itemLocs = item.locationIds || (item.locationId ? [item.locationId] : item.location ? [item.location] : []);
    const matchesLocation = selectedLocation === "" || itemLocs.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesLocation;
  }).sort((a, b) => {
      if (sortOrder === "low-high") return Number(a.amount || 0) - Number(b.amount || 0);
      if (sortOrder === "high-low") return Number(b.amount || 0) - Number(a.amount || 0);
      return 0;
    });

  const getCategoryName = (catId) => {
    const found = categories.find((cat) => cat.id === catId);
    return found ? (found.name || found.title) : "Uncategorized";
  };


  const getLocationName = (locId) => {
    const found = locations.find((loc) => loc.id === locId);
    return found ? (found.name || found.title) : "Unknown Location";
  };

  if (loading) {
    return <LoadingContainer>Loading products...</LoadingContainer>;
  }

  return (
    <Container>
      <HeaderBanner>
        <ColorfulTitle>Product Management 🛍️</ColorfulTitle>
        <ColorfulSub>Manage inventory items, upload compressed product visuals, and track quantities.</ColorfulSub>
      </HeaderBanner>

      <ActionRow>
        <ColorfulSectionTitle>Inventory ({filteredData.length})</ColorfulSectionTitle>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <SearchInput
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: `1px solid ${Border}`,
              borderRadius: "8px",
              padding: "8px 10px",
              fontSize: "0.9rem",
              outline: "none",
              color: Dark,
              background: White,
              boxSizing: "border-box",
              margin: 0,
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name || cat.title}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              border: `1px solid ${Border}`,
              borderRadius: "8px",
              padding: "8px 10px",
              fontSize: "0.9rem",
              outline: "none",
              color: Dark,
              background: White,
              boxSizing: "border-box",
              margin: 0,
            }}
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <PrimaryButton onClick={() => {
            setEditingId(null);
            setForm({ name: "", description: "", amount: "", quantity: "", neverFinishes: false, categoryIds: [], isLive: true, pricingType: "single", locationIds: [], });
            setImageFiles([null, null, null, null]);
            setImagePreviews(["", "", "", ""]);
            setExistingImageUrls(["", "", "", ""]);
            setVariations([]);
            setFeaturesText("");
            setPriceTiers([{ minQty: 1, maxQty: 1, price: "" }]);
            setYoutubeLinksText("");
            setShowModal(true);
          }}>
            <span>+ Add Product</span>
          </PrimaryButton>
        </div>
      </ActionRow>

      {filteredData.length === 0 ? (
        <LoadingContainer>No products found.</LoadingContainer>
      ) : (
        <ProductsGrid>
          {filteredData.map((item) => {
            const displayImg = item.images?.[0] || item.image || "https://placehold.co/400x300?text=No+Image";
            return (
              <ProductCard key={item.id} onClick={() => router.push(`/productdetail/${createSlug(item.name, item.id)}`)}>
                <ProductImageContainer>
                  <ProductImage src={displayImg} alt={item.name} />
                </ProductImageContainer>
                <ProductInfo>
                  <ProductName>
                    {item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : ""}
                  </ProductName>
                  
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {(() => {
                      const itemCats = item.categoryIds || (item.categoryId ? [item.categoryId] : []);
                      if (itemCats.length === 0) return <ProductcategoryBadge>Uncategorized</ProductcategoryBadge>;
                      
                      return itemCats.map((catId, idx) => {
                        const name = getCategoryName(catId);
                        return (
                          <ProductcategoryBadge key={idx}>
                            {name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}
                          </ProductcategoryBadge>
                        );
                      });
                    })()}
                  </div>

                  {/* 🌟 Display Multiple Locations on Product Card */}
<div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
  {(() => {
    const itemLocs = item.locationIds || (item.locationId ? [item.locationId] : item.location ? [item.location] : []);
    if (itemLocs.length === 0) return <span style={{ fontSize: "0.75rem", color: TextMuted, fontWeight: "600" }}>📍 No Location</span>;
    
    return itemLocs.map((locId, idx) => (
      <span key={idx} style={{ fontSize: "0.75rem", color: TextMuted, fontWeight: "600", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
        📍 {getLocationName(locId)}
      </span>
    ));
  })()}
</div>

                  {item.variations && item.variations.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {item.variations.map((v, idx) => (
                        <div key={idx} style={{ fontSize: "0.8rem", color: TextMuted, fontWeight: "600" }}>
                          <span style={{ color: PrimaryNavy }}>{v.name}:</span> {v.options}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* <ProductAmount>
                      ₦{Number(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </ProductAmount>
                      <ProductAmount>
                    {item.pricingType === "tiered"&&<span style={{ fontSize: "0.85rem", color: PrimaryNavy }}>Bulk Pricing Available</span>}
                  </ProductAmount> */}

                 <ProductAmount>
  ₦{Number(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
</ProductAmount>
{/* 🌟 Product Amount with Optional Strike-through Price */}
                   
                    {Number(item.strikeAmount) > 0 && (
                      <span style={{ 
                        fontSize: "0.85rem", 
                        color: "#797d85", 
                        textDecoration: "line-through",
                        fontWeight: "500" 
                      }}>
                        ₦{Number(item.strikeAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}

                    {item.strikeAmount&&<span style={{
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          color: "#16a34a",
                          background: "#dcfce7",
                          padding: "2px 6px",
                          borderRadius: "4px"
                        }}>
                          {Math.round(((Number(item.strikeAmount) - Number(item.amount)) / Number(item.strikeAmount)) * 100)}% OFF
                        </span>}

<ProductAmount>
  {item.pricingType === "tiered" && <span style={{ fontSize: "0.85rem", color: PrimaryNavy }}>Range Qty Tiered Pricing Available</span>}
  {item.pricingType === "singleqtytiered" && <span style={{ fontSize: "0.85rem", color: PrimaryNavy }}>Single Qty Tiered Pricing Available</span>}
</ProductAmount>


                

                  <ProductStock>
                    {item.neverFinishes ? "∞ In Unlimited Stock" : `Stock: ${item.quantity ?? 0}`}
                  </ProductStock>
                </ProductInfo>

                <ButtonGroup>
                  <ToggleContainer onClick={(e) => handleToggleLive(item, e)} title="Toggle Public Visibility">
                    <ToggleSwitchBox $isChecked={item.isLive}>
                      <ToggleThumb $isChecked={item.isLive} />
                    </ToggleSwitchBox>
                    <ToggleLabel>{item.isLive ? "On" : "Off"}</ToggleLabel>
                  </ToggleContainer>
                  <EditButton onClick={(e) => handleEdit(item, e)}>Edit</EditButton>
                  <DeleteButton onClick={(e) => handleDelete(item.id, e)}>Delete</DeleteButton>
                </ButtonGroup>
              </ProductCard>
            );
          })}
        </ProductsGrid>
      )}

      {/* 🌟 Add/Edit Product Modal */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{editingId ? "Edit Product" : "Create New Product"}</ModalTitle>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
              <StyledInput
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                  Product Categories (Select at least one)
                </label>
                <div style={{ 
                  border: `1px solid ${Border}`, 
                  borderRadius: "6px", 
                  padding: "8px", 
                  maxHeight: "120px", 
                  overflowY: "auto",
                  background: White,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  {categories.map((cat) => {
                    const isChecked = form.categoryIds.includes(cat.id);
                    return (
                      <CheckboxRow key={cat.id}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const current = [...form.categoryIds];
                            if (e.target.checked) {
                              current.push(cat.id);
                            } else {
                              const index = current.indexOf(cat.id);
                              if (index > -1) current.splice(index, 1);
                            }
                            setForm({ ...form, categoryIds: current });
                          }}
                        />
                        <span>{cat.name || cat.title}</span>
                      </CheckboxRow>
                    );
                  })}
                </div>
              </div>

            
{/* 🌟 Product Locations Checkboxes (Multiple selection matching categories) */}
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
  <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
    Product Locations (Select at least one) <span style={{ color: Danger }}>*</span>
  </label>
  <div style={{ 
    border: `1px solid ${Border}`, 
    borderRadius: "6px", 
    padding: "8px", 
    maxHeight: "120px", 
    overflowY: "auto",
    background: White,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  }}>
    {locations.map((loc) => {
      const isChecked = form.locationIds.includes(loc.id);
      return (
        <CheckboxRow key={loc.id}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              const current = [...form.locationIds];
              if (e.target.checked) {
                current.push(loc.id);
              } else {
                const index = current.indexOf(loc.id);
                if (index > -1) current.splice(index, 1);
              }
              setForm({ ...form, locationIds: current });
            }}
          />
          <span>{loc.name || loc.title}</span>
        </CheckboxRow>
      );
    })}
  </div>
</div>

              <StyledTextarea
                placeholder="Product Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              {/* 🌟 Pricing Type Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                  Pricing Structure
                </label>
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="pricingType"
                      checked={form.pricingType === "single"}
                      onChange={() => setForm({ ...form, pricingType: "single" })}
                    />
                    Single Price Option
                  </label>

{/* <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}> */}
      {/* <input
        type="radio"
        name="pricingType"
        checked={form.pricingType === "singleqtytiered"}
        onChange={() => setForm({ ...form, pricingType: "singleqtytiered" })}
      />
      Single Qty Tiered (1 Qty & Price)
    </label> */}

                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="pricingType"
                      checked={form.pricingType === "tiered"}
                      onChange={() => setForm({ ...form, pricingType: "tiered" })}
                    />
                    Range Quantity-Based Pricing
                  </label>
                </div>
              </div>

              {form.pricingType === "single" ? (
                <StyledInput
                  type="number"
                  placeholder="Amount (₦)"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              ) : form.pricingType === "singleqtytiered" ? (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "#f9f9f9", padding: "10px", borderRadius: "6px", border: `1px solid ${Border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
        Single Quantity Price Tiers (Exact Qty & Price)
      </span>
      <PrimaryButton type="button" onClick={handleAddTier} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
        + Add Qty Tier
      </PrimaryButton>
    </div>

    {priceTiers.map((tier, index) => (
      <div key={index} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <StyledInput
          type="number"
          placeholder="Exact Qty (e.g. 5)"
          value={tier.minQty}
          onChange={(e) => {
            const val = e.target.value;
            handleTierChange(index, "minQty", val);
            handleTierChange(index, "maxQty", val); // Keep maxQty equal to minQty
          }}
          required
        />
        <StyledInput
          type="number"
          placeholder="Price (₦)"
          value={tier.price}
          onChange={(e) => handleTierChange(index, "price", e.target.value)}
          required
        />
        <DeleteButton type="button" onClick={() => handleRemoveTier(index)} style={{ padding: "8px 10px" }}>
          ✕
        </DeleteButton>
      </div>
    ))}
    <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
      Customer must buy the exact specified quantity to get this tier price.
    </p>
  </div>
) : ( <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "#f9f9f9", padding: "10px", borderRadius: "6px", border: `1px solid ${Border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                      Price Ranges Based on Quantity
                    </span>
                    <PrimaryButton type="button" onClick={handleAddTier} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                      + Add Price Tier
                    </PrimaryButton>
                  </div>

                  {priceTiers.map((tier, index) => (
                    <div key={index} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <StyledInput
                        type="number"
                        placeholder="Min Qty (e.g. 1)"
                        value={tier.minQty}
                        onChange={(e) => handleTierChange(index, "minQty", e.target.value)}
                      />
                      <StyledInput
                        type="number"
                        placeholder="Max Qty (leave blank for infinity)"
                        value={tier.maxQty}
                        onChange={(e) => handleTierChange(index, "maxQty", e.target.value)}
                      />
                      <StyledInput
                        type="number"
                        placeholder="Price (₦)"
                        value={tier.price}
                        onChange={(e) => handleTierChange(index, "price", e.target.value)}
                      />
                      <DeleteButton type="button" onClick={() => handleRemoveTier(index)} style={{ padding: "8px 10px" }}>
                        ✕
                      </DeleteButton>
                    </div>
                  ))}
                  <p style={{color:"red", fontSize:"0.8rem", fontWeight:"bold"}}>Max Qty of highest range should be left blank for infinity</p>
                </div>
              )}

              {/* 🌟 Added Strike-through Price Input */}
              <StyledInput
                type="number"
                placeholder="Strike-through Price / Old Amount (₦) - Optional"
                value={form.strikeAmount}
                onChange={(e) => setForm({ ...form, strikeAmount: e.target.value })}
              />

              {/* Stock Management Row */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {!form.neverFinishes && (
                  <StyledInput
                    type="number"
                    placeholder="Stock Quantity"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  />
                )}
                <CheckboxRow>
                  <input
                    type="checkbox"
                    checked={form.neverFinishes}
                    onChange={(e) => setForm({ ...form, neverFinishes: e.target.checked })}
                  />
                  <span>Unlimited Stock (Never finishes)</span>
                </CheckboxRow>
              </div>

              {/* Live Status Toggle in Form */}
              <ToggleContainer onClick={() => setForm({ ...form, isLive: !form.isLive })}>
                <ToggleSwitchBox $isChecked={form.isLive}>
                  <ToggleThumb $isChecked={form.isLive} />
                </ToggleSwitchBox>
                <ToggleLabel>Product is {form.isLive ? "Live (Visible)" : "Hidden"}</ToggleLabel>
              </ToggleContainer>

              {/* 🌟 Features Textarea */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                  Product Features (Each line separated by Enter becomes a bullet point)
                </label>
                <StyledTextarea
                  placeholder="e.g. Waterproof material&#10;Easy to install&#10;Durable build"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  style={{ minHeight: "80px" }}
                />
              </div>

              {/* 🌟 YouTube Links Textarea */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                  YouTube Video Links (Optional, multiple links each on a new line)
                </label>
                <StyledTextarea
                  placeholder="e.g. https://www.youtube.com/watch?v=xxxx&#10;https://youtu.be/yyyy"
                  value={youtubeLinksText}
                  onChange={(e) => setYoutubeLinksText(e.target.value)}
                  style={{ minHeight: "60px" }}
                />
              </div>

              {/* 🌟 Product Variations Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                    Product Variations (e.g., Size, Color)
                  </span>
                  <PrimaryButton type="button" onClick={handleAddVariation} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                    + Add Variation
                  </PrimaryButton>
                </div>

                {variations.map((v, index) => (
                  <div key={index} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <StyledInput
                      type="text"
                      placeholder="Attribute (e.g. Size)"
                      value={v.name}
                      onChange={(e) => handleVariationChange(index, "name", e.target.value)}
                    />
                    <StyledInput
                      type="text"
                      placeholder="Options (e.g. S, M, L)"
                      value={v.options}
                      onChange={(e) => handleVariationChange(index, "options", e.target.value)}
                    />
                    <DeleteButton type="button" onClick={() => handleRemoveVariation(index)} style={{ padding: "8px 10px" }}>
                      ✕
                    </DeleteButton>
                  </div>
                ))}
              </div>

              {/* 🌟 4-Slot Image Upload Grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "700", color: Dark }}>
                  Product Images (Slot 1 is Compulsory)
                </label>
                <ImageSlotsGrid>
                  {[0, 1, 2, 3].map((slotIdx) => (
                    <ImageSlotCard key={slotIdx}>
                      <SlotLabel>Slot {slotIdx + 1} {slotIdx === 0 && "*"}</SlotLabel>
                      {imagePreviews[slotIdx] ? (
                        <SlotPreviewWrapper>
                          <img 
                            src={imagePreviews[slotIdx]} 
                            alt={`Preview ${slotIdx + 1}`} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <RemoveSlotButton type="button" onClick={() => handleRemoveSlot(slotIdx)}>
                            ✕
                          </RemoveSlotButton>
                        </SlotPreviewWrapper>
                      ) : (
                        <UploadButtonLabel>
                          Choose File
                          <HiddenFileInput 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleSlotFileChange(slotIdx, e)}
                          />
                        </UploadButtonLabel>
                      )}
                    </ImageSlotCard>
                  ))}
                </ImageSlotsGrid>
              </div>

              <ModalActions>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">
                  {editingId ? "Update Product" : "Save Product"}
                </SaveButton>
              </ModalActions>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}