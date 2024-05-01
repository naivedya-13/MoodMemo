import React, { useState } from "react";

const Navbaar = () => {
  return (
    <div className="flex  bg-blue-300 justify-end border border-black">
      <nav>
        <ul className="flex items-center gap-3 m-3 font-sans text-2xl">
          <li className="text-3lx">Home </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbaar;
