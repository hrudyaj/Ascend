import React from 'react';

export const motion = {
  div: React.forwardRef(({ children, className, style, onClick, layoutId, initial, animate, exit, transition, ...props }, ref) => (
    <div ref={ref} className={className} style={style} onClick={onClick} {...props}>{children}</div>
  )),
  span: React.forwardRef(({ children, className, style, ...props }, ref) => (
    <span ref={ref} className={className} style={style} {...props}>{children}</span>
  )),
};

export const AnimatePresence = ({ children }) => <>{children}</>;
