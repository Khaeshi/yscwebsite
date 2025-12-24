import { Button } from "../components/ui/button.tsx";
import { Menu, X, Music, Trophy, Palette, ChefHat, Camera, MapPin, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoImg from "../assets/YSC.png";
import * as Scroll from 'react-scroll';



interface HeaderProps {
  currentPath: string;  
}

export function Header({ currentPath } : HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProgramsMenu, setShowProgramsMenu] = useState(false);
  const [showMobileProgramsMenu, setShowMobileProgramsMenu] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80); 
  const [currentPathname, setCurrentPathname] = useState(''); 
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isActive = (path:string) => currentPath === path; 
  const isHomePage = currentPath === "/"; 


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update header height dynamically for responsive offset
  useEffect(() => {
    const updateHeight = () => {
      setHeaderHeight(window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 64 : 56);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Set current pathname on mount (client-side)
  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, []);

  // Close mobile menu on route change (use currentPathname)
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowMobileProgramsMenu(false);
  }, [currentPathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowProgramsMenu(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowProgramsMenu(false);
    }, 100);
  };

  // Define all programs with their routes
  const programs = [
    { 
      id: 'music', 
      name: 'Music Teaching', 
      path: '/music-teaching',
      icon: Music,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Piano, Guitar, Violin & More'
    },
    { 
      id: 'badminton', 
      name: 'Badminton Coaching', 
      path: '/badminton-coaching',
      icon: Trophy,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Professional Sports Training'
    },
    { 
      id: 'arts', 
      name: 'Arts Lessons', 
      path: '/arts-lesson',
      icon: Palette,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
      description: 'Painting, Drawing & Sculpture'
    },
    { 
      id: 'cooking', 
      name: 'Cooking Sessions', 
      path: '/cooking-session',
      icon: ChefHat,
      color: 'orange',
      gradient: 'from-orange-500 to-yellow-500',
      description: 'Culinary Skills & Recipes'
    },
    { 
      id: 'photography', 
      name: 'Photography Classes', 
      path: '/photography-classes',
      icon: Camera,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Visual Storytelling & Editing'
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
            : 'bg-transparent border-b border-white/10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center group">
              <img 
                src={logoImg.src} 
                alt="Young Starter Club" 
                className={`w-auto transition-all duration-300 ${
                  scrolled ? 'h-8 sm:h-10 lg:h-12' : 'h-10 sm:h-12 lg:h-16'
                } group-hover:scale-105`}
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              
            {isHomePage ? (
                <>
                  <button
                    onClick={() => 
                      Scroll.scroller.scrollTo('testimonials', { smooth: true, duration: 500, offset: -headerHeight })}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${scrolled
                      ? 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      : 'text-white hover:bg-white/10'
                      }`}
                  >
                    Testimonials
                  </button>
                  <button
                    onClick={() => 
                      Scroll.scroller.scrollTo('map-section', { smooth: true, duration: 500, offset: -headerHeight })}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${scrolled
                      ? 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      : 'text-white hover:bg-white/10'
                      }`}
                  >
                    <MapPin className="w-4 h-4" />
                    Location
                  </button>
                </>
              ) : null }

              {/* Programs Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    showProgramsMenu || ['/music-teaching', '/badminton-coaching', '/arts-lesson', '/cooking-session', '/photography-classes'].includes(currentPathname)  
                      ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  Programs
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showProgramsMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega Menu Dropdown */}
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${
                    showProgramsMenu 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[600px]">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-4 px-2">
                      Explore Our Programs
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {programs.map((program) => (
                        <a 
                          key={program.id}
                          href={program.path}
                          className={`group p-4 rounded-xl transition-all duration-200 ${
                            isActive(program.path)
                                ? `bg-${program.color}-50 ring-2 ring-${program.color}-200 p-5`
                              : 'hover:bg-gray-50 hover:shadow-md pb-5'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                              <program.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors mb-0.5">
                                {program.name}
                              </h4>
                              <p className="text-xs text-gray-500 leading-tight">
                                {program.description}
                              </p>
                            </div>
                          </div>
                        </a >
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About a  */}
              <a 
                href="/aboutpage"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/aboutpage')
                    ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                    : scrolled 
                      ? 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                About
              </a >

              {/* Home */}
              <a 
                href="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                    : scrolled 
                      ? 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                Home
              </a >

              <Button 
                className="ml-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors relative z-[60] ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Modal */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed left-0 right-0 top-20 sm:top-24 bottom-auto max-h-[calc(100vh-6rem)] z-[56] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 px-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-lg mx-auto">
              <div className="overflow-y-auto max-h-[calc(100vh-8rem)] p-6">
                
                {/* Home a  */}
                <div className="mb-4">
                  <a 
                  href="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive('/')
                        ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="font-medium">Home</span>
                  </a >
                </div>

                {/* Programs Section */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowMobileProgramsMenu(!showMobileProgramsMenu)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      showMobileProgramsMenu || ['/music-teaching', '/badminton-coaching', '/arts-lesson', '/cooking-session', '/photography-classes'].includes(currentPathname)  // Use currentPathname
                        ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">Programs</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${showMobileProgramsMenu ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Programs Dropdown */}
                  <div 
                    className={`grid gap-2 mt-2 transition-all duration-300 overflow-hidden ${
                      showMobileProgramsMenu ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {programs.map((program) => (
                      <a 
                        key={program.id}
                        href={program.path}
                        className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${
                          isActive(program.path) 
                            ? `bg-${program.color}-50 ring-2 ring-${program.color}-200` 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0`}>
                          <program.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 mb-1">{program.name}</div>
                          <div className="text-sm text-gray-500">{program.description}</div>
                        </div>
                      </a >
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6" />

                {/* Other Navigation Buttons */}
                <div className="space-y-2 mb-6">
                  {isHomePage ? (
                    <>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          Scroll.scroller.scrollTo('testimonials' , { smooth: true, duration: 500, offset: -headerHeight });
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-pink-500" />
                        <span className="font-medium">Testimonials</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          window.location.href = '/#testimonials';
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-pink-500" />
                        <span className="font-medium">Testimonials</span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = '/#location';
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Location</span>
                      </button>
                    </>
                  )}
                </div>


                {/* CTA Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                  onClick={() => {
                    window.open('https://www.facebook.com/YSCcommunity', '_blank');
                    setMobileMenuOpen(false);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Us on Facebook
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}