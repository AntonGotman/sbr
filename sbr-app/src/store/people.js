import { defineStore } from 'pinia'

function seedPeople() {
  return [
    {
      id: 1,
      name: 'Анастасия Ремогузина',
      role: 'Фотограф',
      description: 'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты',
      photo: '/images/person-anastasia.jpg',
      color: null
    },
    {
      id: 2,
      name: 'Дмитрий Орлов',
      role: 'Оператор дрона',
      description: 'Аэросъёмка объектов и территорий, лицензированный пилот, страховка оборудования',
      photo: null,
      color: '#C4913A'   // тёплый золотистый
    },
    {
      id: 3,
      name: 'Елена Иванова',
      role: 'Видеограф',
      description: 'Монтаж и цветокоррекция роликов для соцсетей и презентаций, полный цикл постпродакшна',
      photo: null,
      color: '#4E849A'   // сине-зелёный
    },
    {
      id: 4,
      name: 'Иван Иванов',
      role: 'Фотограф',
      description: 'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты',
      photo: '/images/person-ivan.jpg',
      color: null
    },
    {
      id: 5,
      name: 'Мария Соколова',
      role: 'Дизайнер',
      description: 'Разработка фирменного стиля, презентаций и полиграфии под бренд компании',
      photo: null,
      color: '#8B5F96'   // фиолетовый
    },
    {
      id: 6,
      name: 'Сергей Кротов',
      role: 'Звукорежиссёр',
      description: 'Запись и сведение звука для мероприятий любого масштаба, выезд с оборудованием',
      photo: null,
      color: '#7A5C48'   // тёплый коричневый
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
    setQuery(q) { this.query = q },
    setSort(s)  { this.sort = s  }
  }
})
