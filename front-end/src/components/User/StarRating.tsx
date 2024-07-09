import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface RatingProps {
  totalStars: number;
  initialRating: number; 
  onStarClick?: (star: number) => void; 
}

const StarRating: React.FC<RatingProps> = ({ totalStars, initialRating, onStarClick }) => {
  const [selectedStars, setSelectedStars] = useState(initialRating); 

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
    onStarClick && onStarClick(star);  
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`h-6 w-6 cursor-pointer ${starValue <= selectedStars ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
      {/* <span className="ml-2">{selectedStars} / {totalStars}</span> */}
    </div>
  );
};

export default StarRating;
