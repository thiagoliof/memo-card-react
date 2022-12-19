import { gql } from '@apollo/client';

export const GET_ALL_GAME = gql`
    query{
        games {
            name
            card {
                id
                name
                url
            }
        }
    } 
`;
