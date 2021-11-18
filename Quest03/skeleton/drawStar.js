function star(){
  const nString = prompt('별모양의 높이를 알려주세요.')
  const n = parseInt(nString);
  const array = [];
  for(let i = 0; i < n; i++){
    let line = '';
    for(let k = 0; k < n-i+1; k++){
      line += ' ';
    }
    for(let k = 0; k < 2*i+1; k++){
      line += '*';
    }
    for(let k = 0; k < n-i+1; k++){
      line += ' ';
    }
    array.push(line);
  }
  const result = array.join('\n');
  console.log(result);
}
star()