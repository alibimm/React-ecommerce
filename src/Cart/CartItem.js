import React, { Component } from "react";
import { findProductPrice, priceToString } from "../lib/utils";
import ProductAttribute from "../ProductDetails/ProductAttribute";
import "./CartItem.css";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
    };
  }

  onPrevImage = () => {
    const { gallery } = this.props.item.product;
    const prevInd = this.state.image === 0 ? gallery.length - 1 : this.state.image - 1;
    this.setState({ image: prevInd });
  };
  onNextImage = () => {
    const { gallery } = this.props.item.product;
    const nextInd = this.state.image === gallery.length - 1 ? 0 : this.state.image + 1;
    this.setState({ image: nextInd });
  };

  render() {
    const { item, currency, inc, dec, onRemoveFromCart, onSetAttr } = this.props;
    const price = findProductPrice(item.product, currency);
    return (
      <div className="cart-item">
        <div className="details">
          <div className="brand">{item.product.brand}</div>
          <div className="name">{item.product.name}</div>
          <div className="price-tag">{priceToString(price)}</div>
          <div>
            {item.product.attributes.map((attribute) => (
              <ProductAttribute
                className="attribute"
                attr={attribute}
                onSetAttr={onSetAttr}
                selected={item.attributes ? item.attributes[attribute.id] : undefined}
                key={attribute.id}
              />
            ))}
          </div>
        </div>
        <div className="cart-quantity-control">
          <button onClick={inc}>+</button>
          {item.qty}
          <button onClick={dec}>-</button>
        </div>
        <div className="cart-gallery">
          <img src={item.product.gallery[this.state.image]} alt={item.product.name} />
          <div className="cart-gallery-controls">
            <div className="btn" onClick={this.onPrevImage}>
              <div className="arrow left"></div>
            </div>
            <div className="btn" onClick={this.onNextImage}>
              <div className="arrow right"></div>
            </div>
          </div>
        </div>
        <div className="delete-item" onClick={onRemoveFromCart}><div className="cross">&times;</div></div>
      </div>
    );
  }
}

export default CartItem;
