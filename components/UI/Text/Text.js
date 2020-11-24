import React from "react";
import styled from "styled-components";

export const headingPrimary = ({ children, className, ...props }) => {
  return <Primary className={className}>{children}</Primary>;
};

export const headingSecondary = ({
  handler,
  children,
  className,
  ...props
}) => {
  return (
    <Secondary
      className={className}
      clickable={handler ? true : false}
      onClick={handler}
    >
      {children}
    </Secondary>
  );
};

export const headingTertiary = ({ className, children, ...props }) => {
  return <Tertiary className={className}>{children}</Tertiary>;
};

export const paragraph = ({
  weight,
  color,
  size,
  handler,
  children,
  clickable,
  className,
  hoverColor,
  ...props
}) => {
  return (
    <Paragraph
      weight={weight}
      color={color}
      size={size}
      clickable={clickable}
      onClick={handler}
      className={className}
      hoverColor={hoverColor}
    >
      {children}
    </Paragraph>
  );
};

export const span = ({
  handler,
  color,
  children,
  className,
  clickable,
  ...props
}) => {
  return (
    <Span
      onClick={handler}
      className={className}
      clickable={clickable}
      color={color}
    >
      {children}
    </Span>
  );
};

export const pre = (props) => {
  return <Pre>{props.children}</Pre>;
};

export const link = React.forwardRef(
  ({ children, href, onClick, color, size, className, pad }, ref) => (
    <Link
      pad={pad}
      color={color}
      ref={ref}
      href={href}
      size={size}
      className={className}
    >
      {children}
    </Link>
  )
);

const Primary = styled.h1`
  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};
  margin-bottom: 1rem;
  backface-visibility: hidden;
  font-size: var(--primary-heading-size);
  font-weight: 700;
`;

const Secondary = styled.h2`
  font-size: var(--secondary-heading-size);
  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};

  cursor: ${({ clickable }) => (clickable ? "pointer" : null)};

  font-weight: 600;
`;

const Tertiary = styled.h3`
  font-size: var(--default-font-size-reg);
  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};
`;

const Paragraph = styled.p`
  font-size: var(
    --default-font-size-${(props) => (props.size ? `${props.size}` : "reg")}
  );

  cursor: ${({ clickable }) => (clickable ? "pointer" : null)};
  &:hover {
    color: ${({ theme, hoverColor }) =>
      hoverColor ? theme.fonts[hoverColor] : null};
    text-decoration: ${({ clickable }) => (clickable ? "underline" : false)};
  }

  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};

  font-weight: ${(props) => (props.weight ? props.weight : 400)};
`;

const Span = styled.span`
  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};
  cursor: ${({ clickable }) => (clickable ? "pointer" : null)};
  &:hover {
    color: ${({ theme, ...props }) =>
      props.hoverColor ? theme.fonts[props.hoverColor] : theme.fonts.tertiary};
    text-decoration: ${({ clickable }) => (clickable ? "underline" : false)};
  }
`;

const Pre = styled.pre`
  font-size: var(--default-font-size-reg);
  font-family: inherit;
  white-space: pre-wrap;
`;

const Link = styled.a`
  /* display: flex; */
  font-size: var(
    --default-font-size-${({ theme, ...props }) => (props.size ? props.size : "reg")}
  );
  cursor: pointer;
  padding: ${({ pad }) => (pad ? pad : "1rem")};
  text-decoration: none;
  color: ${({ theme, ...props }) =>
    props.color ? theme.fonts[props.color] : theme.fonts.primaryText};

  &:hover {
    color: ${({ theme }) => theme.fonts.tertiary};
    text-decoration: underline;
  }
  /* color: var(--color-primary);
  font-size: var(--default-font-size-reg);
  text-decoration: underline var(--color-primary);
  cursor: pointer;

  &:hover {
    color: var(--color-tertiary);
  } */
`;
