import { defineStore } from 'pinia'

const DESCRIPTION =
  'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты'

function seedPeople() {
  return [
    {
      id: 1,
      name: 'Иван Иванов',
      role: 'Фотограф',
      description: DESCRIPTION,
      photo: '/images/person-ivan.jpg'
    },
    {
      id: 2,
      name: 'Анастасия Ремогузина',
      role: 'Фотограф',
      description: DESCRIPTION,
      photo: '/images/person-anastasia.jpg'
    },
    {
      id: 3,
      name: 'Иван Иванов',
      role: 'Фотограф',
      description: DESCRIPTION,
      photo: '/images/person-ivan.jpg'
    },
    {
      id: 4,
      name: 'Анастасия Ремогузина',
      role: 'Фотограф',
      description: DESCRIPTION,
      photo: '/images/person-anastasia.jpg'
    }
  ]
}

export const usePeopleStore = defineStore('people', {
  state: () => ({
    people: seedPeople(),
    query: '',
    sort: 'alpha'
  }),
  getters: {
    filtered: (state) => {
      let list = state.people.filter((p) =>
        p.name.toLowerCase().includes(state.query.trim().toLowerCase())
      )
      if (state.sort === 'alpha') {
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
      }
      return list
    }
  },
  actions: {
    setQuery(q) {
      this.query = q
    },
    setSort(s) {
      this.sort = s
    }
  }
})
