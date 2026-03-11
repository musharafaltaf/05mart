export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 py-10 px-10">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h3 className="font-semibold mb-3">05Mart</h3>
          <p className="text-sm text-gray-400">
            Premium clothing for everyday style.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <p className="text-sm text-gray-400">T-Shirts</p>
          <p className="text-sm text-gray-400">Shirts</p>
          <p className="text-sm text-gray-400">Hoodies</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <p className="text-sm text-gray-400">Contact</p>
          <p className="text-sm text-gray-400">Returns</p>
          <p className="text-sm text-gray-400">Shipping</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <p className="text-sm text-gray-400">Privacy Policy</p>
          <p className="text-sm text-gray-400">Terms</p>
        </div>

      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        © 2026 05Mart
      </p>

    </footer>
  );
}