import React from "react";

const features = {
  silver: [
    "100 Connection Requests/day",
    "Chat with developers",
    "Verified blue tick",
    "3 months validity",
  ],
  gold: [
    "Unlimited Connection Requests",
    "Chat with developers",
    "Verified blue tick",
    "6 months validity",
    "Priority in feed",
    "Early access to features",
  ],
};

const Premium = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-12">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-3xl w-full">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">
            DevZoo
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Go <span className="text-cyan-400">Premium</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm font-mono mt-2 sm:mt-3">
            Unlock the full developer network
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Silver Plan */}
          <div className="relative bg-gray-950 border border-gray-800 p-6 sm:p-8">
            <div className="absolute -top-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-t border-l border-gray-600" />
            <div className="absolute -top-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-t border-r border-gray-600" />
            <div className="absolute -bottom-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-b border-l border-gray-600" />
            <div className="absolute -bottom-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-b border-r border-gray-600" />

            <div className="mb-5 sm:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rotate-45" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Tier 01
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-black text-gray-300"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Silver
              </h3>
            </div>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {features.silver.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-xs sm:text-sm font-mono text-gray-500"
                >
                  <div className="w-1.5 h-1.5 bg-gray-500 rotate-45 flex-shrink-0 mt-1" />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-2.5 sm:py-3 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-gray-200 font-mono font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 touch-manipulation">
              Choose Silver
            </button>
          </div>

          {/* Gold Plan */}
          <div className="relative bg-gray-950 border border-yellow-500/40 p-6 sm:p-8 shadow-2xl shadow-yellow-500/10">
            <div className="absolute -top-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute -top-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-yellow-400" />
            <div className="absolute -bottom-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-yellow-400" />
            <div className="absolute -bottom-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-yellow-400" />

            <div className="absolute -top-3 right-4 sm:right-6 bg-yellow-400 px-2.5 sm:px-3 py-0.5">
              <span className="text-black font-mono font-black text-xs uppercase tracking-widest">
                Best Value
              </span>
            </div>

            <div className="mb-5 sm:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rotate-45" />
                <span className="text-xs font-mono text-yellow-600 uppercase tracking-widest">
                  Tier 02
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-black text-yellow-300"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Gold
              </h3>
            </div>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {features.gold.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-xs sm:text-sm font-mono text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rotate-45 flex-shrink-0 mt-1" />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-mono font-black text-xs sm:text-sm uppercase tracking-widest transition-colors duration-200 touch-manipulation">
              Choose Gold →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
