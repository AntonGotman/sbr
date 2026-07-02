import { defineStore } from 'pinia'

const DESCRIPTION =
  'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты'

function seedPeople() {
  return [
    { id: 1, name: 'Иван Иванов', role: 'Фотограф', description: DESCRIPTION, hue: 162 },
    { id: 2, name: 'Анастасия Ремогузина', role: 'Фотограф', description: DESCRIPTION, hue: 24 },
    { id: 3, name: 'Елена Иванова', role: 'Видеограф', description: 'Монтаж и цветокоррекция роликов для соцсетей и презентаций, полный цикл постпродакшна', hue: 200 },
    { id: 4, name: 'Сергей Кротов', role: 'Звукорежиссёр', description: 'Запись и сведение звука для мероприятий любого масштаба, выезд с оборудованием', hue: 280 },
    { id: 5, name: 'Мария Соколова', role: 'Дизайнер', description: 'Разработка фирменного стиля, презентаций и полиграфии под бренд компании', hue: 330 },
    { id: 6, name: 'Дмитрий Орлов', role: 'Оператор дрона', description: 'Аэросъёмка объектов и территорий, лицензированный пилот, страховка оборудования', hue: 48 }
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
      } else if (state.sort === 'role') {
        list = [...list].sort((a, b) => a.role.localeCompare(b.role, 'ru'))
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
    },
    addPerson({ name, role, description }) {
      const id = Math.max(0, ...this.people.map((p) => p.id)) + 1
      this.people.push({
        id,
        name: name.trim(),
        role: role.trim() || 'Специалист',
        description: description.trim() || DESCRIPTION,
        hue: Math.floor(Math.random() * 360)
      })
    }
  }
})
