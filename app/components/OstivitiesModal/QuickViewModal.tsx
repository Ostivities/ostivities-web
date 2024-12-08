import React, { useState } from "react";

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[]; // Array of images
  description?: string; // If 'description' is optional
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails | null;
}

const QuickViewModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Manage selected quantity

  if (!isOpen || !product) return null;

  const { name, price, images = [], description } = product;

  // Fallback for dummy gallery images if no provided images
  const galleryImages = images.length > 0
    ? images
    : [
      "/shirt.jpeg",
      "/test2.jpeg",
      "/test3.jpeg",
      "/test1.jpeg",
    ];

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Prevent going below 1
  };


  // Handle clicks outside modal content
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      onClick={handleBackgroundClick} // Detect click outside content
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg"
        style={{
          maxWidth: "900px",
          width: "90%",
          borderRadius: "15px",
          boxShadow: "0px 8px 24px 0px #00000014",
        }}
      >
        <div className="flex justify-end mb-4">
          <button
            className="text-gray-600 text-3xl font-bold"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            &times;
          </button>
        </div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col items-center">
            {/* Main Image */}
            <img
              src={selectedImage || galleryImages[0]}
              alt={name}
              className="w-[420px] h-[480px] object-cover rounded-md mb-4"
              style={{ boxShadow: "0px 8px 24px 0px #00000014" }}
            />

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${img === selectedImage ? "border-2 border-[#e20000]" : ""
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            {/* Product Name */}
            <h2 className="text-2xl font-bold text-black mb-2">{name}</h2>

            {/* Product Price */}
            <h3 className="text-xl font-bold text-black mb-4">₦{price.toLocaleString()}</h3>

            {/* Product Description */}
            <div className="mb-4">
              <h4 className="text-md font-semibold text-black mb-2">Description</h4>
              <p className="text-gray-600">
                {description || "No description available."}
              </p>
            </div>

            {/* Dropdowns for Colour & Size */}
            <div className="mb-4">
              <h4 className="text-md font-semibold text-black mb-2">Colour</h4>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select colour</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
              </select>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-semibold text-black mb-2">Size</h4>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <h4 className="text-md font-semibold text-black mb-2 mr-4">Quantity</h4>
              <div className="flex items-center gap-2 border border-gray-400 rounded-md px-3 py-1">
                <button
                  className="text-lg text-black cursor-pointer"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <div className="text-black font-semibold text-sm w-8 text-center">{quantity}</div>
                <button
                  className="text-lg text-black cursor-pointer"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className="bg-[#e20000] text-white py-3 px-6 rounded-md"
                style={{ fontWeight: "500", borderRadius: "25px", width: "100%", marginTop: "20px" }}
                onClick={() => console.log("Added to cart")}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
