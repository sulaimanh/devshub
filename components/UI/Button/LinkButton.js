import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { device } from "../../../styles/Devices";
import styled from "styled-components";

const button = ({
  type,
  category,
  icon,
  size,
  label,
  handler,
  color,
  route,
  ...props
}) => {
  console.log(route);
  return (
    <Link href={`${route}`}>
      <A
        type={type}
        color={color}
        className={category}
        size={size}
        onClick={handler}
        color={color}
      >
        {icon} {label}
      </A>
    </Link>
  );
};

const A = styled.button`
  font-family: inherit;
  padding: 1.5rem 2rem;

  &:not(:first-child) {
    margin-left: 1rem;
  }
  border-radius: 5px;
  font-size: var(--default-font-size-reg);
  font-weight: 600;

  width: ${(props) =>
    props.size === "small"
      ? "fit-content"
      : props.width === "medium"
      ? "50%"
      : "100%"};

  border: none;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media ${device.tabPort} {
    padding: 1rem 1.5rem;
  }

  &.primary {
    background-color: ${({ theme }) => theme.buttons.primary};
    color: ${({ theme }) => theme.fonts.white};

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--box-shadow);
      background-color: ${({ theme }) => theme.buttons.primaryHover};

      &::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
      }
    }

    &:active,
    &:focus {
      outline: none;
      transform: translateY(1px);
      box-shadow: var(--box-shadow);
    }
  }

  &.secondary {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    background-color: ${({ theme, ...props }) =>
      props.color ? theme[props.color] : theme.buttons.secondary};
    color: ${({ theme }) => theme.fonts.primaryText};

    &:after {
      content: "";
      position: absolute;

      right: 0;
      width: 0;
      bottom: -5px;
      background: ${({ theme }) => theme.buttons.secondaryHover};
      height: 3px;
      transition-property: width;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
    &:hover:after,
    &:focus:after,
    &:active:after {
      outline: none;
      left: 0;
      right: auto;
      width: 100%;
    }
  }

  &.tertiary {
    color: ${({ theme }) => theme.fonts.white};

    background-color: ${({ theme }) => theme.buttons.tertiary};
    &:hover {
      background-color: ${({ theme }) => theme.buttons.tertiaryHover};
    }
  }

  &.tertiary-outline {
    border: 1px solid ${({ theme }) => theme.buttons.tertiary};

    color: ${({ theme }) => theme.fonts.tertiary};
    background-color: transparent;
    &:hover {
      background-color: ${({ theme }) => theme.buttons.tertiary};
      color: ${({ theme }) => theme.fonts.white};
    }
  }

  &.delete {
    color: ${({ theme }) => theme.fonts.white};

    background-color: ${({ theme }) => theme.buttons.red};
    &:hover {
      background-color: ${({ theme }) => theme.buttons.redHover};
      color: ${({ theme }) => theme.fonts.white};
    }
  }

  &.github {
    color: ${({ theme }) => theme.fonts.white};
    /* background-color: #24292e; */
    background-color: ${({ theme }) => theme.buttons.black};
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.buttons.blackHover};
    }
  }

  &.google {
    color: ${({ theme }) => theme.fonts.white};
    background-color: ${({ theme }) => theme.buttons.red};
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.buttons.redHover};
    }
  }
`;

button.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

button.defaultProps = {
  handler: null,
  icon: null
};

export default button;
