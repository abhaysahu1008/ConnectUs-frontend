import React from "react";

const Premium = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Silver Plan */}
        <div className="card bg-base-100 shadow-xl flex-1 border border-gray-300">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Silver Plan</h2>

            <ul className="mt-4 space-y-2 text-left">
              <li>✔ 100 Connection Requests/day</li>
              <li>✔ Chat with other people</li>
              <li>✔ Blue tick</li>
              <li>✔ 3 months validity</li>
            </ul>

            <button className="btn btn-outline btn-primary mt-6 w-full">
              Choose Silver
            </button>
          </div>
        </div>

        {/* Gold Plan (Highlight this) */}
        <div className="card bg-base-100 shadow-2xl flex-1 border-2 border-yellow-500 scale-105">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Gold Plan</h2>

            <ul className="mt-4 space-y-2 text-left">
              <li>✔ Chat with other people</li>
              <li>✔ Infinite Connection Requests/day</li>
              <li>✔ Blue tick</li>
              <li>✔ 6 months validity</li>
            </ul>

            <button className="btn btn-warning mt-6 w-full">Choose Gold</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
