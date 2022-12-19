import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { SectionTilesProps } from '../../utils/SectionProps';
import Image from '../elements/Image';
import Button from '../elements/Button';



const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Card = ({
    game,
    onClick,
    loading,
}) => {

    return (
            <div className="tiles-item reveal-from-right">
                <div className="tiles-item-inner">
                    {!game.card.flipped && 
                        (<Button disabled={loading} tag="a" color="primary" wideMobile onClick={() => !loading? onClick(game.card): null}>flip image</Button>)
                    }
                    <div className="testimonial-item-content">
                        <ReactCardFlip isFlipped={game.card.flipped} flipDirection="horizontal">
                            <Image
                                src={'https://raw.githubusercontent.com/thiagoliof/images_game_memo/main/incognitous.jpg'}
                                width={300}
                            />

                            <Image
                                src={game.card.url}
                                width={300}
                            />
                        </ReactCardFlip>
                    </div>
                    <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                        <span className="testimonial-item-name text-color-high">Picture</span>
                        <span className="text-color-low"> / </span>
                        <span className="testimonial-item-link">
                            {game.card.name}
                        </span>
                    </div>
                </div> 
            </div>
    );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
