import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { formatCurrency } from "../../utils/formatCurrency";
import "./CartItem.css";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__image" />
      <div className="cart-item__details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <strong>{formatCurrency(item.price)}</strong>
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button type="button" onClick={() => onDecrease(item.id)} aria-label="Decrease quantity">
            <FiMinus />
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onIncrease(item.id)} aria-label="Increase quantity">
            <FiPlus />
          </button>
        </div>
        <button type="button" className="cart-item__remove" onClick={() => onRemove(item.id)}>
          <FiTrash2 />
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
