export const generateDummyData = () => {
  const names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Anna', 'Tom', 'Emily', 'James', 'Olivia'];
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    firstName: names[Math.floor(Math.random() * names.length)],
    lastName: names[Math.floor(Math.random() * names.length)],
    rollNo: 100 + i,
    email: `student${100 + i}@gmail.com`,
    dateOfBirth: `199${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 12) + 1}-01`
  }));
};
