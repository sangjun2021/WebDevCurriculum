# 체크리스트

- ## 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?
    - 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?
        
        Ecma international에서 브라우저에서 동작하는 언어는 어떻게 동작하는지를 적어놓은 명세서이다. 지금은 그 명세서에 적힌 동작을 자바스크립트를 통해 구현되었다. ES5같은 것들은 각 명세서의 버전들이고 ES6를 기준으로 2015년에 작성되었으며 ES2016은 2016년에 작성되었고 ES5는 ES6 바로 전 버전을 뜻한다. 버전간의 차이가 가장 큰 것은 ES5 와 ES6이다. ES6부터 let, const ,화살표 함수 등 많은 기능들이 추가 되었고 IE를 제외한 주요 브라우저에서 동일하게 작동하는 가장 최신버전이 ES6이다.
        
    - 자바스크립트의 표준은 어떻게 제정될까요?
        - ecma 내에서 자바스크립트의 표준명세서를 제정하는 TC39라는 그룹이 있다. TC39는 2달에 한번 3일간 미팅을 가지고 매년 github에 표준 명세서를 올리면 브라우저 벤더들은 그 명세서를 기준으로 브라우저에서 동작하는 자바스크립트 엔진을 개발한다.
- ## 자바스크립트의 문법은 다른 언어들과 비교해 어떤 특징이 있을까요?
    
    자바스크립트와 다른 언어들과의 차이점은 여러가지가 있다. 가장 큰 차이점은 컴퓨터의 동작을 제어하기 위한 목적인 다른 언어와 다르게 자바스크립트는 브라우저를 제어할 목적으로 나온 언어이다. 그렇기 때문에 초기에는 무거운 작업이 아닌 가벼운 작업을 돌렸고 그로 인해서 컴파일이 필요없고 데이터의 타입이 단조로운 특징이 있다.(number vs int,float,double)
    
    - 자바스크립트에서 반복문을 돌리는 방법은 어떤 것들이 있을까요?
        - for문
            - for(let i =0; i < n; i++)
            - for(let item of array)
            - for(let index in array)
        - while문
        - 배열의 내장 함수(forEach,map,filter,reduce)
- ## 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요
    
    ```javascript
    const Element = document.getElementById('#box');
    Element.classList.add('class'); // 클래스 추가
    Element.classList.remove('class'); // 클래스 제거
    Element.classList.toggle('class'); // 클래스 토글(없으면 추가하고 있으면 삭제)
    ```
    
    - IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
        
        ```javascript
        // IE9 과 이전버전은 docuemnt.classList를 지원하지 않는다.
        Element.className += "class"; // 클래스 추가
        var nextClassName = Element.className.replace('class','');
        Element.className = nextClassName; //클래스 삭제
        ```
        
- ## 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?
    - `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
        - var의 경우 var로 선언된 변수가 선언된 함수가 유효한 범위이고 전역에서 선언됬다면 전역이 스코프가 된다. var를 이용한 경우 선언된 변수가 다시 선언되는 것을 허용한다.
        - let의 경우 let으로 선언된 변수가 선언된 블록이 유효한 범위이다. 여기서 블록이란 함수,if문,for문 등 {}로 감싸진 모든 문법을 뜻한다. let은 한번 선언된 변수가 다시 선언되는 것을 허용하지 않는다. const는 let과 동일하지만 변수의 재할당을 허용하지 않는다.
- ## 자바스크립트의 익명 함수는 무엇인가요?
    
    익명함수는 함수를 변수에 할당하거나 이름을 붙이지 않고 사용하는 함수를 말한다. 즉시실행함수 와 콜백함수에서 많이 쓰인다.
    
    - 자바스크립트의 Arrow function은 무엇일까요?
        
        함수를 정의하는 새로운 리터럴 방식이다. 원래는 function 키워드를 사용해야하지만 ⇒화살표를 이용해서 함수를 정의하기 때문에 화살표 함수라고 불린다. 기존 함수 몇가지 점을 제외하고 동일하다. 다른점으로는 자체적인 this를 가지고 있지 않아서 this를 상속받는다. {}로 감싸주지 않는다면 return을 적지 않더라도 값을 반환한다. 
        
        ```javascript
        function add(a,b){
        return a+b;
        }
        const add = (a,b) => a+b;
        const add = (a,b) => {
        	return a+b;
        }
        ```