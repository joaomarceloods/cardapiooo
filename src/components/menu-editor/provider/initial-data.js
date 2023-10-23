const initialData = {
  title: 'My first board',
  items: {
    'item-1': {
      id: 'item-1',
      type: 'product',
      data: { title: 'Take out the garbage', price: 9.99 },
    },
    'item-2': {
      id: 'item-2',
      type: 'product',
      data: { title: 'Watch my favorite show', price: 9.99 },
    },
    'item-3': {
      id: 'item-3',
      type: 'product',
      data: { title: 'Charge my phone', price: 9.99 },
    },
    'item-4': {
      id: 'item-4',
      type: 'product',
      data: { title: 'Cook dinner', price: 9.99 },
    },
    'item-5': {
      id: 'item-5',
      type: 'product',
      data: { title: 'Walk the dog', price: 9.99 },
    },
    'item-6': {
      id: 'item-6',
      type: 'product',
      data: { title: 'Take out the garbage', price: 9.99 },
    },
    'item-7': {
      id: 'item-6',
      type: 'remark',
      data: { content: 'Rate us on the app store' },
    },
    'item-8': {
      id: 'item-8',
      type: 'product',
      data: { title: 'Do laundry', price: 9.99 },
    },
    'item-9': {
      id: 'item-9',
      type: 'product',
      data: { title: 'Pay bills', price: 9.99 },
    },
    'item-10': {
      id: 'item-10',
      type: 'product',
      data: { title: 'Read a book', price: 9.99 },
    },
    'item-11': {
      id: 'item-11',
      type: 'product',
      data: { title: 'Exercise', price: 9.99 },
    },
    'item-12': {
      id: 'item-12',
      type: 'product',
      data: { title: 'Call a friend', price: 9.99 },
    },
  },
  sections: {
    'section-1': {
      id: 'section-1',
      title: 'To do',
      sortedItemIds: [
        'item-1',
        'item-2',
        'item-3',
        'item-4',
        'item-5',
        'item-6',
        'item-7',
        'item-8',
        'item-9',
        'item-10',
        'item-11',
        'item-12',
      ],
    },
    'section-2': {
      id: 'section-2',
      title: 'In progress',
      sortedItemIds: [],
    },
    'section-3': {
      id: 'section-3',
      title: 'Done',
      sortedItemIds: [],
    },
  },
  sortedSectionIds: ['section-1', 'section-2', 'section-3'],
}

export default initialData
