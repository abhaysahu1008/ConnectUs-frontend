import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const features = {
  silver: [
    "100 Connection Requests/day",
    "Chat with developers",
    "Verified badge",
    "3 months validity",
  ],
  gold: [
    "Unlimited Connection Requests",
    "Chat with developers",
    "Verified badge",
    "6 months validity",
    "Priority in feed",
    "Early access to features",
  ],
};

const Premium = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const handleMembershipType = async (type) => {
    const order = axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      {
        withCredentials: true,
      },
    );

    const { KeyId, order_id, amount, notes } = (await order).data;

    const options = {
      key: KeyId,
      amount: amount,
      currency: "INR",
      name: "DevZoo",
      description: "Test Transaction",
      order_id: order_id,
      prefill: {
        name: `${notes.firstName || ""} ${notes.lastName || ""}`,
        email: notes.emailId || "",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 sm:px-6 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <p className="text-cyan-400/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Upgrade
          </p>
          <h2 className="text-4xl font-bold text-white mb-3">
            Go{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Premium
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            Unlock the full potential of your developer network with exclusive
            features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Silver Plan */}
          <div
            className="relative bg-[#12121a]/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 transition-all duration-500 hover:border-white/[0.12]"
            onMouseEnter={() => setHoveredPlan("silver")}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <div className="mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mb-4 border border-white/[0.06]">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-1">
                Starter
              </p>
              <h3 className="text-2xl font-bold text-white">Silver</h3>
              <p className="text-white/40 text-sm mt-1">
                Perfect for getting started
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-white">300</span>
              <span className="text-white/30 text-sm">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.silver.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/50"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className="w-full py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] text-white/70 hover:text-white font-medium text-sm rounded-xl transition-all duration-300"
              onClick={() => handleMembershipType("Silver")}
            >
              Choose Silver
            </button>
          </div>

          {/* Gold Plan */}
          <div
            className="relative bg-[#12121a]/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 transition-all duration-500 hover:border-amber-500/40 shadow-lg shadow-amber-500/5"
            onMouseEnter={() => setHoveredPlan("gold")}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <div className="absolute -top-3 right-6">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Best Value
              </div>
            </div>

            <div className="mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mb-4 border border-amber-500/20">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <p className="text-amber-400/60 text-xs font-semibold uppercase tracking-wider mb-1">
                Pro
              </p>
              <h3 className="text-2xl font-bold text-white">Gold</h3>
              <p className="text-white/40 text-sm mt-1">
                For serious developers
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-white">700</span>
              <span className="text-white/30 text-sm">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.gold.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/50"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20"
              onClick={() => handleMembershipType("Gold")}
            >
              Choose Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
