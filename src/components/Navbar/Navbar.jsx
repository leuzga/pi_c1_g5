import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpModal from '../Modal/SignUpModal';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  width: 100%;
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #f5e9fc, rgba(121, 90, 246, 0));
  backdrop-filter: blur(10px);
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  max-width: 200px;
`;

const CenterSection = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #795af6;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const SearchInput = styled.input`
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
`;

const Navbar = ({ menuItems, logo }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const redirectToHome = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <NavbarContainer>
        <LeftSection>
          <img
            src={logo}
            alt='Logo'
            style={{ maxWidth: '100%', width: '200px' }}
            onClick={redirectToHome}
          />
        </LeftSection>
        <CenterSection>
          {menuItems.map((item) => (
            <NavButton key={item}>{item}</NavButton>
          ))}
        </CenterSection>
        <RightSection>
          <SearchInput type='text' placeholder='Buscar' />
          <Avatar />
          <NavButton onClick={handleLoginClick}>Login</NavButton>
          <NavButton onClick={handleSignUpClick}>Sign Up</NavButton>
        </RightSection>
      </NavbarContainer>
      <SignUpModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Navbar;
