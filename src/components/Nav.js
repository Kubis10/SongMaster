import React from 'react'
import styled from 'styled-components';
import logo from '../assets/images/logo.png';

const NavStyles = styled.div`
    background-color: var(--dark-bg);
    padding: 0 2rem;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        height: 100%;
        padding: 0;
    }
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    li {
        margin-left: 2rem;
    }
    a {
        color: var(--gray-1);
        font-size: 1.3rem;
        font-weight: 600;
        &:hover {
            color: var(--accent);
        }
    }
    .logo {
        max-width: 330px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .active {
        color: var(--accent);
    }
    @media only screen and (max-width: 768px) {
        .container {
            flex-direction: column;
        }
        ul {
            flex-direction: column;
            margin-top: 1rem;
        }
        .logo {
            text-align: center;
        }
        li {
            margin: 0.5rem 0;
        }
    }
`;

export default function Nav() {
  return (
    <NavStyles>
        <div className="container">
            <img src={logo} alt="logo" className="logo" />
            <ul>
                <li>
                    <a href="/" className="active">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/projects">Projects</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </div>
    </NavStyles>
  )
}
