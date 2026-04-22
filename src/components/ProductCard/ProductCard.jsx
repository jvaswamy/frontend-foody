import { FiPlus } from "react-icons/fi";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ProductCard.css";

function ProductCard({ item, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__content">
        <h3>{item.name}</h3>
        <p className="product-card__price">{formatCurrency(item.price)}</p>
        <p className="product-card__description">{item.description}</p>
        <button type="button" className="btn btn-primary product-card__button" onClick={() => onAddToCart(item)}>
          <FiPlus />
          Add to Cart
        </button>
      </div>

      <div className="product-card__media">
        <img src={item.image} alt={item.name} />
      </div>
    </article>
  );
}

export default ProductCard;
