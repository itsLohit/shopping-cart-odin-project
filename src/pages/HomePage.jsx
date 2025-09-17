import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="home-hero">
      <h1>
        Shop Smart.
        <br />
        Live Stylish.
      </h1>
      <div>
        <p>
          Welcome to <strong>Sippy Cart</strong> — where everyday essentials meet modern style. Our handpicked selection means you can upgrade your routine and your wardrobe effortlessly.
        </p>
      </div>
      <Link to="/shop">
        <button>
          START SHOPPING →
        </button>
      </Link>
      <div>
        Find your next favorite thing.
      </div>
    </main>
)}