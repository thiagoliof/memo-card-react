import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Button from '../elements/Button';
import { GET_ALL_GAME } from '../../graphql/query/query'
import { GRATE_GAME_SESSION } from '../../graphql/query/mutation'

import { useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import { setGames } from '../../store/reducers/gamesSlice'
import { setActiveGame} from '../../store/reducers/sessionGamesSlice'


const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const Games = ({
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
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Games',
    paragraph: ''
  };

  const [getGames, { data  }] = useLazyQuery(GET_ALL_GAME);
  const [setSessionGames] = useMutation(GRATE_GAME_SESSION);
  const dispatch = useDispatch()

  React.useEffect(() => {
    
    getGames();
    
    if (data) { 
  
      const groupedData = _.chain(data.games)
        .groupBy("name")
        .map((value, key) => ({ name: key, cards: value }))
        .value()
        
        dispatch(setGames(groupedData));
    }

  }, [data, getGames]);

  
  const startGame = (game) => {
    const game_name = game.name
    setSessionGames({ variables: {game_name}});
    dispatch(setActiveGame(game))
  }

  const results = useSelector((state) => {
    return state.games
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

            {results && results.games.map((game) => (
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-01.svg')}
                        alt="Features tile icon 01"
                        width={64}
                        height={64} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Game: {game.name}
                    </h4>
                    <p>
                      <Button tag="a" color="primary" wideMobile onClick={() => startGame(game)}>
                        Start this game
                      </Button>
                    </p>
                    <p className="m-0 text-sm">
                      Number of cards in this game set: <b>{game.cards.length}</b>
                    </p>
                    {game.cards && game.cards.map((c) => (        
                    <p className="m-0 text-sm">
                      Card Name: <b>{c.card.name}</b>
                    </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </section>
  );
}

Games.propTypes = propTypes;
Games.defaultProps = defaultProps;

export default Games;