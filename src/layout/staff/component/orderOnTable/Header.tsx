import React from 'react';

interface HeaderProps {
  onCartClick: () => void;
  selectedItemsSubtotal: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, selectedItemsSubtotal }) => {
  return (
    <header className="header" id="header">
      <div className="header__container">
        <a
          href="#"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault();
            onCartClick();
          }}
        >
          <i className="bi bi-bag cart-icon px-3 fs-4"></i>
          <span>{selectedItemsSubtotal.toLocaleString()} VND</span>
        </a>
        <button className="header__toggle">
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
