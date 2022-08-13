import React, { useState } from "react";


  const [pointsGiven, setPointsGiven] = useState(0);
  const [pointsPossible, setPointsPossible] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const calculate = (e) => {
    e.preventDefault();
    const formValid = +pointsGiven >= 0 && +pointsPossible > 0;
    if (!formValid) {
      return;
    }
    setPercentage((+pointsGiven / +pointsPossible) * 100);
    return percentage;
  };

  module.exports = {calculate};