import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GoldStarSvg from "./SVG/GoldStarSVG";
import WhiteStarSvg from "./SVG/WhiteStarSVG";

interface StarRatingProps {
    totalStars: number;
    filledStars: number;
    starSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
                                                   totalStars,
                                                   filledStars = 0,
                                                   starSize = 18,
                                               }) => {

    const stars = Array.from({ length: totalStars }, (_, index) => (

        <SvgXml
            key={index}
            width={starSize}
            height={starSize}
            xml={index < filledStars ? GoldStarSvg : WhiteStarSvg}
        />
    ));

    return (

        <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'center' }}>
            {stars.map((star, index) => (
                <React.Fragment key={index}>{star}</React.Fragment>
            ))}
        </View>

    );
};

export default StarRating;
