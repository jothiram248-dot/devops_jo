import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Key,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout, setloginId } from "@/features/auth/authSlice";
import { useMeQuery } from "@/features/api/userApiSlice";
import { persistor } from "@/store";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const { data: user } = useMeQuery();

  const { isAuthenticated } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const firstName = user?.me?.firstName || "User";
  const menuRef = useRef(null);
  useEffect(() => {
    if (user) {
      dispatch(
        setloginId({
          email: user.me.email,
          username: user.me.username,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTopPosition = currentScrollPos < 10;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisible(isScrollingUp || isAtTopPosition);
        setPrevScrollPos(currentScrollPos);
        setIsAtTop(isAtTopPosition); // Update isAtTop state
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    setShowProfileMenu(false);
    window.location.href = "/";
    // window.location.reload();
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 ${
        isAtTop
          ? "bg-transparent" // Fully transparent at the top
          : "bg-dark-100/80 backdrop-blur-md" // Background with blur when scrolled
      } transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* <nav
      className={`${
        visible
          ? prevScrollPos === 0
            ? "relative"
            : "fixed"
          : "-translate-y-full"
      } w-full z-50 bg-dark-100/80 backdrop-blur-md transition-all duration-300`}
    > */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        {/* <Link to="/" className="flex items-center">
          <img
            src="/public/SacredSecret logo color-01.svg"
            alt="Logo"
            className="h-20 w-auto"
          />
        </Link> */}

        <Link to="/" className="flex items-center pl-4">
          <img
            src="/SacredSecret logo color white.svg"
            alt="Logo"
            className="h-16 w-auto transform scale-150"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-white hover:text-accent-100 transition-colors"
          >
            Home
          </button>
          <div
          // className="relative"
          // ref={menuRef}
          // onMouseEnter={() => setIsOpen(true)}
          // onMouseLeave={(e) => {

          //   if (!menuRef.current.contains(e.relatedTarget)) {
          //     setIsOpen(false);
          //   }
          // }}
          >
            {/* Features Button - Click to Scroll */}
            <button
              onClick={() => scrollToSection("features")}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:text-accent-100 transition-all"
            >
              Features
              {/* <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-accent-100" : ""}`} /> */}
            </button>

            {/* Dropdown Menu - Now Stays Open While Hovering Over Options */}
            {isOpen && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-dark-200/90 backdrop-blur-lg border border-dark-300 rounded-xl shadow-2xl z-50 transition-all duration-300"
                onMouseEnter={() => setIsOpen(true)} // Keep dropdown open when mouse is inside
                onMouseLeave={() => setIsOpen(false)} // Close when mouse leaves dropdown
              >
                <div className="py-2">
                  {/* Manage Credentials */}
                  <button
                    onClick={() => navigate("/manage-credentials")}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm font-medium text-gray-300 hover:bg-dark-300 hover:text-white transition-all"
                  >
                    <Key className="w-5 h-5 text-accent-100" />
                    Manage Credentials
                  </button>

                  {/* Smart Notifications */}
                  <button
                    onClick={() => navigate("/smart-notifications")}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm font-medium text-gray-300 hover:bg-dark-300 hover:text-white transition-all"
                  >
                    <Bell className="w-5 h-5 text-accent-100" />
                    Smart Notifications
                  </button>

                  {/* Choose Your Nominee */}
                  <button
                    onClick={() => navigate("/choose-nominee")}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm font-medium text-gray-300 hover:bg-dark-300 hover:text-white transition-all"
                  >
                    <Users className="w-5 h-5 text-accent-100" />
                    Choose Your Nominee
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <button
            // onClick={() => scrollToSection("about")}
            onClick={() => navigate("/about")}
            className="text-white hover:text-accent-100 transition-colors"
          >
            About Us
          </button> */}

          <Link
            to="/contact"
            className="text-white hover:text-accent-100 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Authentication/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 rounded-full text-white hover:text-accent-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-6">
              {/* Dashboard (Enhanced Premium Animated Button) */}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="relative flex items-center px-5 py-2.5 rounded-lg text-gray-200 transition-all duration-300 shadow-lg overflow-hidden group"
                >
                  {/* Multi-layered background with premium gradient */}
                  <span className="absolute inset-0 bg-gradient-to-r from-dark-300 to-dark-400 opacity-100"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-100/80 to-accent-200/80 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>

                  {/* Subtle border glow effect */}
                  <span className="absolute inset-0 border border-accent-100/30 rounded-lg group-hover:border-accent-100/60 transition-all duration-300"></span>

                  {/* Shine effect animation on hover */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>

                  {/* Content with subtle icon animation */}
                  <span className="relative flex items-center gap-2.5">
                    <LayoutDashboard className="w-5 h-5 text-accent-100 group-hover:text-white transition-all duration-300 transform group-hover:scale-110" />
                    <span className="text-sm font-medium tracking-wide group-hover:translate-x-0.5 transition-transform duration-300">
                      Dashboard
                    </span>
                  </span>
                </Link>
              )}

              {/* Profile Avatar & Dropdown - Enhanced Premium Version */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 group"
                >
                  {/* Compact multi-layered border effect */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 opacity-80 shadow-md"></span>
                  <span className="absolute inset-0.5 rounded-full bg-dark-200"></span>
                  <span className="absolute inset-1 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 p-0.5"></span>

                  {/* Avatar content */}
                  <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden">
                    {user?.me?.profileImgUrl ? (
                      <img
                        src={user.me.profileImgUrl}
                        alt={`${user.me.firstName} ${user.me.lastName}`}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center text-dark-100 font-semibold text-base">
                        {`${user?.me?.firstName?.charAt(0) || ""}${
                          user?.me?.lastName?.charAt(0) || ""
                        }`}
                      </div>
                    )}
                  </div>

                  {/* Compact hover glow effect */}
                  <span className="absolute -inset-1 rounded-full bg-accent-100/0 group-hover:bg-accent-100/20 blur-sm transition-all duration-300"></span>
                </button>

                {/* Compact Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl shadow-xl z-50 transition-all duration-300 animate-fadeIn">
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-dark-200/90 backdrop-blur-lg border border-dark-300 rounded-xl"></div>

                    {/* Top accent line */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent-100/70 via-accent-200/70 to-accent-100/70"></div>

                    {/* User Info Header */}
                    <div className="relative p-4 border-b border-dark-300/70">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-100/50 bg-gradient-to-br from-accent-100/30 to-accent-200/30 flex items-center justify-center">
                          {user?.me?.profileImgUrl ? (
                            <img
                              src={user.me.profileImgUrl}
                              alt={`${user.me.firstName} ${user.me.lastName}`}
                              crossOrigin="anonymous"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center text-dark-100 font-semibold text-base">
                              {`${user?.me?.firstName?.charAt(0) || ""}${
                                user?.me?.lastName?.charAt(0) || ""
                              }`}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white tracking-wide">
                            {user?.me?.firstName || ""}{" "}
                            {user?.me?.lastName || "User"}
                          </p>
                          <div className="flex items-center mt-1 gap-2">
                            <p className="text-xs text-gray-400">
                              ID: {user?.me?.displayId || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="relative py-1">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-xs font-medium text-gray-200 hover:bg-gradient-to-r hover:from-dark-300 hover:to-dark-300/50 hover:text-white transition-all duration-300 relative group/item"
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-100/0 group-hover/item:bg-accent-100/80 transition-all duration-300"></span>
                        <User className="w-4 h-4 text-accent-100 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="group-hover/item:translate-x-0.5 transition-transform duration-300">
                          Profile Settings
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-xs font-medium text-gray-200 hover:bg-gradient-to-r hover:from-dark-300 hover:to-dark-300/50 hover:text-white transition-all duration-300 relative group/item"
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-100/0 group-hover/item:bg-accent-100/80 transition-all duration-300"></span>
                        <LayoutDashboard className="w-4 h-4 text-accent-100 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="group-hover/item:translate-x-0.5 transition-transform duration-300">
                          Dashboard
                        </span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-xs font-medium text-red-400 hover:bg-gradient-to-r hover:from-red-500/30 hover:to-red-500/10 hover:text-white transition-all duration-300 relative group/item"
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-400/0 group-hover/item:bg-red-400/80 transition-all duration-300"></span>
                        <LogOut className="w-4 h-4 text-red-400 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300" />
                        <span className="group-hover/item:translate-x-0.5 transition-transform duration-300">
                          Log Out
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 w-full bg-dark-100/90 backdrop-blur-md rounded-lg shadow-lg z-10"
          ref={mobileMenuRef}
        >
          <div className="flex flex-col py-4 px-6 space-y-6">
            {/* Profile Section */}
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-100 bg-gradient-to-r from-accent-100 to-accent-200 flex items-center justify-center text-dark-100 font-semibold text-lg">
                  {user?.me?.profileImgUrls ? (
                    <img
                      src={user.me.profileImgUrl}
                      alt={`${user.me.firstName} ${user.me.lastName}`}
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Display Initials if no image
                    `${user?.me?.firstName?.charAt(0) || ""}${
                      user?.me?.lastName?.charAt(0) || ""
                    }`
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    Hi, {firstName}
                  </p>
                  <p className="text-xs text-gray-400">
                    ID: {user?.me?.displayId || "N/A"}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Features
            </button>
            {/* <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              About Us
            </button> */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-white hover:text-accent-100 transition-colors w-full text-left"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/contact"
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Contact
            </Link>

            {/* Profile Actions */}
            {isAuthenticated && (
              <div className="border-t border-dark-400 pt-4">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-white transition-colors rounded-lg"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-colors rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Authentication Links for Non-Authenticated Users */}
            {!isAuthenticated && (
              <div className="space-y-4">
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-sm text-white hover:text-accent-100 transition-colors rounded-lg text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm bg-accent-100 text-dark-100 hover:opacity-90 transition-opacity rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
