export const mockUser = { _id: 'you', fullName: 'Aarav Sharma', email: 'aarav@example.com', username: 'aarav' }
export const mockRooms = [
  { _id: 'design-systems', name: 'Design systems deep dive', description: 'Quiet co-working for building thoughtful interfaces.', subject: 'Development', maxParticipants: 12, participants: [{ _id: 'maya' }, { _id: 'leo' }, { _id: 'you' }], host: { fullName: 'Maya Chen' }, isSessionActive: true },
  { _id: 'dsa-sprint', name: 'DSA Sprint Room', description: 'Algorithms, patterns, and interview prep.', subject: 'DSA', maxParticipants: 20, participants: [{ _id: 'you' }, { _id: 'sam' }, { _id: 'noor' }, { _id: 'ravi' }], host: { fullName: 'Sam Okafor' }, isSessionActive: false },
  { _id: 'quiet-library', name: 'The Quiet Library', description: 'A low-key room for reading and research.', subject: 'CS Fundamentals', maxParticipants: 8, participants: [{ _id: 'ines' }, { _id: 'you' }], host: { fullName: 'Ines Martin' }, isSessionActive: false },
]
export const mockTasks = [
  { _id: '1', title: 'Review component architecture', description: 'Mark the reusable states before stand-up.', status: 'IN_PROGRESS', priority: 'HIGH', assignedTo: { fullName: 'You' } },
  { _id: '2', title: 'Write empty state copy', description: '', status: 'TODO', priority: 'MEDIUM', assignedTo: { fullName: 'Maya Chen' } },
  { _id: '3', title: 'Share research notes', description: '', status: 'DONE', priority: 'LOW', assignedTo: { fullName: 'Leo Wong' } },
]
export const mockMessages = [
  { _id: '1', sender: { fullName: 'Maya Chen' }, content: 'Welcome in! We are keeping this room distraction-free.', createdAt: new Date(Date.now() - 1320000).toISOString() },
  { _id: '2', sender: { fullName: 'Leo Wong' }, content: 'Perfect. I am starting a 50-minute sprint now.', createdAt: new Date(Date.now() - 420000).toISOString() },
]

