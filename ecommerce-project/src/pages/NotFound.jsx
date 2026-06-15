import { Header } from "../components/Header";
import "./NotFound.css";
export function NotFound({
  cart
}) {
  return (
    <>
      <title>Not Found</title>
      <Header cart={cart} />

      <div className="container">
        <div className="notfound-container">
          <img className="not-found" src={"images/not-found.jpg"} />
        </div>
      </div>
    </>
  );
}
