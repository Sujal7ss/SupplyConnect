import React from "react";

const BidsPage = ({ order, bids }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">Bids</h2>
      <ul className="space-y-4">
        {bids
          .sort((a, b) => b.amount - a.amount)
          .map((bid) => (
            <li key={bid.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Driver: {bid.driverName}</span>
                <span className="font-semibold">Amount: ${bid.amount.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mt-2">Comments: {bid.comments}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BidsPage;
