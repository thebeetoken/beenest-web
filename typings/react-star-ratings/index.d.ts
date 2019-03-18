declare module 'react-star-ratings' {
  import * as React from 'react';
  interface StarRatingsProps {
    rating?: number;
    numberOfStars?: number;
    changeRating?: (rating: number) => void;
    starRatedColor?: string;
    starEmptyColor?: string;
    starHoverColor?: string;
    starDimension?: string;
    starSpacing?: string;
    gradientPathName?: string;
    ignoreInlineStyles?: boolean;
    svgIconPath?: string;
    svgIconViewBox?: string;
    name?: string;
  };
  const StarRatings = React.Component<StarRatingsProps>;
  export default StarRatings;
}
