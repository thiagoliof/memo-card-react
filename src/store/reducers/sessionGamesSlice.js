import { createSlice } from '@reduxjs/toolkit'

export const sessionGamesSlice = createSlice({
  name: 'sessionGames',
  initialState: {
    activeGame: {
      activeCard: [],
      loading: false,
      flippedCorrectly: [],
    },
    finishedGame: false
  },
  reducers: {
    setActiveGame: (state, action) => {
      // hard copy
      const payloadCopy = JSON.parse(JSON.stringify(action.payload))
      const cards = payloadCopy.cards
      
      const original_cards = cards.map((item, index) => {
        item.card.flipped = false
        item.card.index = index
        return item
      })
      
      const cards_copy = JSON.parse(JSON.stringify(original_cards))
      const second_hand_cards = cards_copy.map((item, index) => {
        item.card.index = index + 50
        return item
      })

      const raw_cards = original_cards.concat(...second_hand_cards);
      //it is not a good practices
      const meshedcards = raw_cards.sort(() => Math.random() - 0.5)
      payloadCopy.cards = meshedcards
      state.activeGame = payloadCopy
      state.activeGame.activeCard = []
      state.activeGame.flippedCorrectly = []

    },
    setFlippedCard: (state, action) => {
        const activeCard = JSON.parse(JSON.stringify(action.payload))
        const activeGame = JSON.parse(JSON.stringify(state.activeGame))
        const activeCardIIndex= activeCard.card.index
        

        const cards = activeGame.cards
        const _cards = cards.map(item => {
          if (item.card.index === activeCardIIndex){
              item.card.flipped = !item.card.flipped;
          }
          return item
        })
      
        state.activeGame.activeCard.push(activeCard.card.name)
        state.activeGame.cards = _cards
        state.activeGame.loading =  state.activeGame.activeCard.length === 2? true: false
      
    },
    setManageGame: (state) => {
      const activeGame = JSON.parse(JSON.stringify(state.activeGame))
      const activeCard = activeGame.activeCard

      if (activeCard.length === 2 && activeCard[0] === activeCard[1]){
        state.activeGame.activeCard = []
        state.activeGame.loading = false 
        state.activeGame.flippedCorrectly.push(activeCard[0])

        const hardCopy =JSON.parse(JSON.stringify(state.activeGame.flippedCorrectly)) 
        console.log(hardCopy.length === (activeGame.cards.length / 2))


        state.finishedGame = hardCopy.length === (activeGame.cards.length / 2) ? true : false
      }
      else if (activeCard.length === 2 && activeCard[0] !== activeCard[1]){
        state.activeGame.activeCard = []
        state.activeGame.loading = false 

        const cards = activeGame.cards.map(item => {
          if (activeGame.flippedCorrectly.includes(item.card.name)){
            item.card.flipped = true
          }
          else{
            item.card.flipped = false
          }
          return item
        })
        
        state.activeGame.cards = cards
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveGame, setFlippedCard, setManageGame } = sessionGamesSlice.actions

export default sessionGamesSlice.reducer