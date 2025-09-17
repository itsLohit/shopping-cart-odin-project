import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this route does not exist!</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
