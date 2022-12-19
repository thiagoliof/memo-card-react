import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Card from '../elements/Card';
import Fireworks from '../elements/Fireworks';
import { useSelector, useDispatch } from 'react-redux'
import { setFlippedCard, setManageGame } from '../../store/reducers/sessionGamesSlice'


const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Game = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Memo Game',
    paragraph: ''
  };

  const dispatch = useDispatch()

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const onClick = async (game) => {
    dispatch(setFlippedCard(game));
    await delay(2000);
    dispatch(setManageGame(game))
  }

  const results = useSelector((state) => {
    return state.sessionGame.activeGame.cards
  })

  const loading = useSelector((state) => {
    return state.sessionGame.activeGame.loading
  })


  const finished = useSelector((state) => {
    return state.sessionGame.finishedGame
  })


  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            {/* CARDS */}
            {results && results.map((game, index) => (
              <>
                <Card 
                  key={index} 
                  onClick={() => onClick(game)} 
                  game={game}
                  loading={loading}
                />
              </>
            ))}
          </div>
        </div>
      </div>
      {finished && (<Fireworks/>)}
    </section>
  );
}

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;
