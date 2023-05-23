import { A, unstable_clientOnly } from 'solid-start'

const Crossword = unstable_clientOnly(() => import('~/components/Crossword'))

export default function Home() {
  const words = [
    {
      display: 'London',
      clue: "Sound's capital that's never straight"
    },
    {
      display: 'Paris',
      clue: 'City with an iron lady'
    },
    {
      display: 'Rome',
      clue: 'City where all roads lead'
    },
    {
      display: 'Berlin',
      clue: "Bear's den"
    },
    {
      display: 'Tokyo',
      clue: 'Megacity of the Land of the Rising Sun'
    },
    {
      display: 'Sydney',
      clue: 'Harbour city with an iconic opera house'
    },
    {
      display: 'NewYork',
      clue: 'Concrete jungle'
    },
    {
      display: 'Cairo',
      clue: 'City of pyramids and pharaohs'
    },
    {
      display: 'Rio',
      clue: 'City that sounds like a laugh'
    },
    {
      display: 'Athens',
      clue: 'City where ancient gods live'
    },
    {
      display: 'Moscow',
      clue: "Kremlin's domain"
    },
    {
      display: 'Madrid',
      clue: 'Spanish city that never sleeps'
    },
    {
      display: 'Amsterdam',
      clue: 'Canal city where bikes rule'
    },
    {
      display: 'Dublin',
      clue: "Leprechaun's home with a black brew"
    },
    {
      display: 'Venice',
      clue: 'City of gondolas and masks'
    },
    {
      display: 'Vienna',
      clue: 'City of Strauss and waltzes'
    },
    {
      display: 'Stockholm',
      clue: 'Capital of the land of ice and snow'
    },
    {
      display: 'Beijing',
      clue: "Forbidden city's capital"
    },
    {
      display: 'Lisbon',
      clue: 'City of seven hills'
    },
    {
      display: 'BuenosAires',
      clue: "Tango's passionate birthplace"
    },
    {
      display: 'Helsinki',
      clue: "Nordic capital that's chilly"
    },
    {
      display: 'Bangkok',
      clue: 'City with a spicy street scene'
    },
    {
      display: 'MexicoCity',
      clue: 'Aztec metropolis in the Americas'
    },
    {
      display: 'Prague',
      clue: 'City of Kafka and castles'
    },
    {
      display: 'Toronto',
      clue: 'City with a tall pointy structure'
    },
    {
      display: 'Mumbai',
      clue: "Bollywood's bustling hub"
    },
    {
      display: 'CapeTown',
      clue: 'City at the tip of the continent'
    },
    {
      display: 'Seoul',
      clue: 'City with K-pop and kimchi'
    },
    {
      display: 'Melbourne',
      clue: 'Aussie city where sports are religion'
    },
    {
      display: 'Istanbul',
      clue: 'City that straddles Europe and Asia'
    },
    {
      display: 'Dubai',
      clue: 'City of lavish towers in the desert'
    }
  ]

  return (
    <main class="mx-auto p-4 text-gray-700">
      <Crossword words={words} />
    </main>
  )
}
