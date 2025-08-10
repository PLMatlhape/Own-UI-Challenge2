import React from 'react';
import './Text.css';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted' | 'white';
  align?: 'left' | 'center' | 'right';
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'p',
  size = 'md',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  onClick
}) => {
  const classes = [
    'text-component',
    variant.startsWith('h') ? `text-${variant}` : '',
    `text-${size}`,
    `text-${weight}`,
    `text-${color}`,
    `text-${align}`,
    className
  ].filter(Boolean).join(' ');

  const commonProps = {
    className: classes,
    onClick
  };

  switch (variant) {
    case 'h1':
      return <h1 {...commonProps}>{children}</h1>;
    case 'h2':
      return <h2 {...commonProps}>{children}</h2>;
    case 'h3':
      return <h3 {...commonProps}>{children}</h3>;
    case 'h4':
      return <h4 {...commonProps}>{children}</h4>;
    case 'h5':
      return <h5 {...commonProps}>{children}</h5>;
    case 'h6':
      return <h6 {...commonProps}>{children}</h6>;
    case 'span':
      return <span {...commonProps}>{children}</span>;
    case 'label':
      return <label {...commonProps}>{children}</label>;
    default:
      return <p {...commonProps}>{children}</p>;
  }
};

export default Text;

