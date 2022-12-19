import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Card from '../elements/Card';
import { GET_ALL_GAME } from '../../graphql/query/query'

import { useLazyQuery } from '@apollo/client';
import { concat } from 'lodash';
import { v4 as uuidv4 } from 'uuid';


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
    paragraph: 'Score: 202'
  };

  const [results, setResults] = React.useState();

  const [getGames, { data, loading }] = useLazyQuery(GET_ALL_GAME);

  //https://codesandbox.io/s/fireworks-fn-react-canvas-confetti-forked-obwfrp?file=/src/App.js:140-153

  useEffect(() => {

    return <div>Loading...</div>;
    
    let firsts_cards = [];    
    
    getGames();
    
    if (data) { 

      data.games.forEach(element => {
        var current_element = {
          name: element.name,
          card:{
            name: element.card.name,
            id: element.card.id,
            url: element.card.url,
            fliped: false,
            index: uuidv4()
          },  
        }
        firsts_cards.push(current_element)
      });

      // we need to use a deep copy JSON.parse(JSON.stringify) ...
      var second_cards = JSON.parse(JSON.stringify(firsts_cards)).map(element => {
        element.card.index = uuidv4()
        return element
      });      

      const merged_array = concat(firsts_cards, second_cards)
      setResults(merged_array.sort(() => Math.random() - 0.5));
    }
  }, [data, getGames]);


  const onClick = (index) => {
    const _results = results.map(element => {
      if(element.card.index === index){
        element.card.fliped = !element.card.fliped
      }
      return element;
    })
    setResults(_results);
  }
  
  if (loading) return <div>Loading...</div>;
  

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
            {results && results.map((game) => (
              <>
                <Card 
                  key={game.index} 
                  onClick={onClick} 
                  card_name={game.card.name} 
                  card_id = {game.card.id} 
                  card_url={game.card.url} 
                  fliped={game.card.fliped}
                  index={game.card.index}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;

// {data && data.games.map((game, index) => (
// ))}