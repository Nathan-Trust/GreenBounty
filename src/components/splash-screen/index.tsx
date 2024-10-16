const SplashScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      {/* Top Decorative Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#548235] to-[#66BB6A]"></div>

      {/* Logo and Loader */}
      <div className="flex flex-col items-center space-y-8">
        {/* Company Logo */}
        <img
          src="/path-to-your-logo.png" // Replace with the actual path to your logo
          alt="Company Logo"
          className="h-24 w-auto object-contain animate-zoom-in"
        />

        {/* Custom Loader (3 dots loader) */}
        <div className="flex space-x-2">
          <div className="h-4 w-4 rounded-full bg-[#548235] animate-bounce"></div>
          <div className="h-4 w-4 rounded-full bg-[#66BB6A] animate-bounce delay-200"></div>
          <div className="h-4 w-4 rounded-full bg-[#548235] animate-bounce delay-400"></div>
        </div>

        {/* Subtle tagline/message */}
        <p className="text-xl font-medium tracking-wide text-gray-600 animate-fade-in-slow">
          Preparing your experience...
        </p>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#548235] to-[#66BB6A]"></div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes zoom-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-slow {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-bounce {
          animation: bounce 1.2s infinite;
        }

        .animate-bounce.delay-200 {
          animation-delay: 0.2s;
        }

        .animate-bounce.delay-400 {
          animation-delay: 0.4s;
        }

        .animate-zoom-in {
          animation: zoom-in 1s ease-out forwards;
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
