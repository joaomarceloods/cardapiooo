const initialData = {
  items: {
    'item-1': { id: 'item-1', content: 'Take out the garbage' },
    'item-2': { id: 'item-2', content: 'Watch my favorite show' },
    'item-3': { id: 'item-3', content: 'Charge my phone' },
    'item-4': { id: 'item-4', content: 'Cook dinner' },
    'item-5': { id: 'item-5', content: 'Walk the dog' },
    'item-6': { id: 'item-6', content: 'Take out the garbage' },
    'item-7': { id: 'item-7', content: 'Go grocery shopping' },
    'item-8': { id: 'item-8', content: 'Do laundry' },
    'item-9': { id: 'item-9', content: 'Pay bills' },
    'item-10': { id: 'item-10', content: 'Read a book' },
    'item-11': { id: 'item-11', content: 'Exercise' },
    'item-12': { id: 'item-12', content: 'Call a friend' },
  },
  sections: {
    'section-1': {
      id: 'section-1',
      title: 'To do',
      itemIds: [
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
      itemIds: [],
    },
    'section-3': {
      id: 'section-3',
      title: 'Done',
      itemIds: [],
    },
  },
  sectionOrder: ['section-1', 'section-2', 'section-3'],
}

export default initialData
