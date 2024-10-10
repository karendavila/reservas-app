import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Universidad Central de Venezuela
      </div>
    </footer>
  );
};

export default Footer;
