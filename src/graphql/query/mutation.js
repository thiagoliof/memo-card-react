import { gql } from '@apollo/client';



export const GRATE_GAME_SESSION = gql`
  mutation createGameSession($game_name: String!) {
    createGameSession(game_name: $game_name) {
      game_name
    }
  }
`;