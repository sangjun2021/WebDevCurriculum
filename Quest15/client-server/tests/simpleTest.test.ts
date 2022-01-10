function add(a : number, b : number) : number {
  return a + b;
}

test('1+1 =2', () => {
  expect(add(1, 2)).toBe(3);
});
