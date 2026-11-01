// export default function Footer() {
//   return (
//     <footer className="bg-black text-white mt-20 py-10 px-10">

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

//         <div>
//           <h3 className="font-semibold mb-3">05Mart</h3>
//           <p className="text-sm text-gray-400">
//             Premium clothing for everyday style.
//           </p>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-3">Shop</h3>
//           <p className="text-sm text-gray-400">T-Shirts</p>
//           <p className="text-sm text-gray-400">Shirts</p>
//           <p className="text-sm text-gray-400">Hoodies</p>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-3">Help</h3>
//           <p className="text-sm text-gray-400">Contact</p>
//           <p className="text-sm text-gray-400">Returns</p>
//           <p className="text-sm text-gray-400">Shipping</p>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-3">Legal</h3>
//           <p className="text-sm text-gray-400">Privacy Policy</p>
//           <p className="text-sm text-gray-400">Terms</p>
//         </div>

//       </div>

//       <p className="text-center text-gray-500 text-sm mt-10">
//         © 2026 05Mart
//       </p>

//     </footer>
//   );
// }



export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-xl font-bold mb-3">Rewind Supply</h3>
          <p className="text-sm text-gray-400 leading-6">
            Discover unique pre-loved fashion. Better styles, smarter prices
            and a more sustainable way to shop.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <p className="text-sm text-gray-400 mb-2">T-Shirts</p>
          <p className="text-sm text-gray-400 mb-2">Shirts</p>
          <p className="text-sm text-gray-400 mb-2">Hoodies</p>
          <p className="text-sm text-gray-400 mb-2">Vintage Collection</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Customer Support</h3>
          <p className="text-sm text-gray-400 mb-2">Contact Us</p>
          <p className="text-sm text-gray-400 mb-2">Shipping Policy</p>
          <p className="text-sm text-gray-400 mb-2">Returns & Refunds</p>
          <p className="text-sm text-gray-400 mb-2">Order Tracking</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <p className="text-sm text-gray-400 mb-2">About Us</p>
          <p className="text-sm text-gray-400 mb-2">Privacy Policy</p>
          <p className="text-sm text-gray-400 mb-2">Terms & Conditions</p>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-10 pt-6">
        <p className="text-center text-gray-500 text-sm">
          © 2026 Rewind Supply. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

