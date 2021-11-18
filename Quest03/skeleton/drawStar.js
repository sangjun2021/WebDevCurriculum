function repeat({initial = 0,final,increaseRate = 1,f}){
  for(let i = initial; i < final; i += increaseRate){
    f();
  }
}

function drawTree(array,n){
  for(let i = 0; i < n; i++){
    let line = '';
    repeat({
      final : n+1-i,
      f : () => line += " "
    })
    repeat({
      final : 2*i+1,
      f : () => line += "*"
    })
    array.push(line);
  }
  return array.join('\n');
}

function star(){
  const nString = prompt('삼각형의 높이를 알려주세요.');
  const n = parseInt(nString);
  if(isNaN(nString) || n < 0){
    const askAgain = confirm('공백또는 문자를 입력하면 안됩니다. 다시 입력하시겠습니까?')
    if(askAgain){
      return star();
    }
    return;
  }
  const array = [];
  const result = drawTree(array,n);
  console.log(result);
}

star()


