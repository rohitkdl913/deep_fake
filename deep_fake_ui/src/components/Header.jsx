// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogoClick = () => {
//     if (location.pathname == "/") {
//       window.location.reload();
//       return;
//     }
//     navigate('/');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
//             <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//               </svg>
//             </div>
//             <h1 className="ml-3 text-2xl font-bold text-gray-800">DeepFake Detector</h1>
//           </div>
//           <nav>
//             <ul className="flex space-x-6">
//               <li><a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a></li>
//               <li><a href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
//               <li><a href="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a></li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  
  // Update active link when location changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
      return;
    }
    navigate('/');
  };

  const handleNavClick = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  // Navigation links with their paths
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">DeepFake Detector</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a 
                    href={link.path} 
                    onClick={handleNavClick(link.path)}
                    className={`relative px-2 py-1 text-gray-600 hover:text-indigo-600 transition-colors duration-300 ${
                      activeLink === link.path ? 'text-indigo-600 font-medium' : ''
                    }`}
                  >
                    {link.name}
                    {activeLink === link.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform transition-transform duration-300 animate-pulse" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;