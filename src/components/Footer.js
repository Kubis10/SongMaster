import React from 'react'
import styled from 'styled-components';

const FooterStyles = styled.div`
    background-color: var(--dark-bg);
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: var(--gray-1);
`;

export default function Footer() {
  return (
    <FooterStyles>
        <div className="container">
            <p>Jakub Przybysz 2023</p>
        </div>
    </FooterStyles>
  )
}
