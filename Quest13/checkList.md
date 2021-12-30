# checkList

## GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

GraphQl API는 REST API처럼 데이터통신의 명세서의 종류이며 url과 methods를 활용하는 rest api와 다르게 특정 쿼리문을 작성하여 통신하는 방식이다. rest api의 단점인 overfetch와 underfetch를 보완해준다. 또한 쿼리문의 구조와 유사한 응답값을 주기때문에 응답값을 예측하기 쉬워서 객체 내부의 없는 값을 참조할때의 오류를 줄일 수 있다.

## GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

스키마는 데이터의 타입의 뼈대를 잡아주는 역할을 한다. 예를들어서 a라는 변수는 String이라는 스키마를 만들면 a변수에는 문자형의 데이터만 들어온다. 이를 더 응용하면 객체형태로 뼈대를 잡아줄 수도 있다.

```jsx
type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
type Query {
    getDie(numSides: Int): RandomDie
  }
```

이런식으로 RandomDie라는 타입은 객체로써 키값으로 numSides,rollOnce,roll를 가지고 있고 해당 키의 값들은 Int의 값을 반환하고 그중에서 roll은 인자로 Int형의 numRolls인자를 받고 Int타입으로 이루어진 배열을 반환한다. 타입 끝에 !이 달려있는거는 null값을 허용하지 않는다는 뜻이다.

```jsx
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
	type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
type Query {
    getDie(numSides: Int): RandomDie
  }
`);
graphqlHTTP({
  schema: schema
}));
```

buildSchema 함수를 이용해서 스키마를 만들어 준뒤에 요청을 받는 부분에서 schema를 지정해주면 된다.

## GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

resolver는 실질적으로 받은요청을 처리하는 부분으로 함수로 이루어져있고 반환된 값을 응답으로 보낸다.

해당 필드를 조회할때마다 필드내부의 resolve가 실행되고 그 반환값을 응답으로 보낸다.

```jsx
// schema
type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
// resolver
rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
```

rollDice라는 resolver는 스키마에서 명시된 Int형의 인자 numDice,numSide 를 받아서 내부에서 로직을 처리한 후에 Int형으로 이루어진 배열을 반환한다.

```jsx
var root = {
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
graphqlHTTP({
  rootValue: root,
}));
```

객체로 만들어서 각 메서드를 resolver로 만들어준 뒤에 graphqlHTTP의 rootValue로 넘겨주는 방식이있고

```jsx
var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, { id }) => {
        return fakeDatabase[id];
      },
    },
  },
});
```

GraphQL 오브젝트를 만들때 필드 값안에 resolve 메서드에 선언하는 방식이 있다.

### GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

GraphQL에서는 중첩된 정보를 가져오는 경우가 많이 생긴다. 데이터베이스를 사용할 경우 쿼리를 통해 정보를 가지고온다.

```jsx
query{
	user : {
		username
		post : {
			id
			title
			text
		}
	}
}
```

GraphQL을 통해 위와 같은 요청을 보내게 될경우 쿼리문은 예상과 다르게 매우 여러번 실행이된다.

```jsx
// 예상 쿼리문
SELECT * FROM USERS INNER JOIN POSTS ON USERS.id = POSTS.userId;
```

```jsx
// 실제 쿼리문
SELECT * FROM USERS;
SELECT * FROM POSTS WHERE userId = 1;
SELECT * FROM POSTS WHERE userId = 2;
SELECT * FROM POSTS WHERE userId = 3;
****SELECT * FROM POSTS WHERE userId = 4;
```

로컬환경에서는 ORM을 변환해주는 연산이 더 추가되어 아주 약간의 성능저하가 있겠지만 서버의 경우 api서버,데이터베이스 서버,스토리지서버 등 서버가 세분화 되어있고 저 쿼리문 하나 당 다른 서버와 통신을 한다고 했을때 소요되는 시간이 매우 많이 늘어난다. 이것을 N+1문제라고 하며 이를 해결하기 위해 DataLoader를 사용한다.

그리고 api 엔드포인트가 하나이기때문에 캐싱이 안되는 문제도 DataLoader를 이용해서 해결할 수 있다.

DataLoader는 모든 요청을 모아서 한꺼번에 처리하는 Batch방식으로 동작한다.

```jsx
const batchFn = async(keys) => {
	return await getUsers(keys);
}
const dataLoader = new DataLoader(batchFn);

const resolver = {
	Query: {
      posts: async ({id}) => {
        const posts = await getPosts(id);
        const result = Posts.map((post) => {
          post.user =  batchFn.load(post.user);
          return post;
        });
        return result;
      },
    },
  };
}
```

new DataLoader를 통해서 얻은 객체의 .load에 키값들을 넣게 되면 키값으로 이루어진 배열이 DataLoader에 넣은 Batch함수의 배열로 넣어지고 일괄적으로 실행이 된다. 이때 .loader에 넣은 key값은 기본적으로 캐싱이 되서 같은 값을 입력할 경우 batchFn함수 내부 로직을 건너띄고 바로 반환이 된다. 이를 막을 방법으로 캐싱 옵션을 false로 넣어주면 캐싱이 안되고 잘 변하지 않는 데이터를 다룰때에는 캐싱을 하다가 데이터가 변경될때마다 dataLoader.clear(key)를 넣어주면 캐시가 지워진다.

## 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

### Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?

Apollo 프레임워크를 사용할 경우 서버와 클라이언트 용 apollo가 쌍으로 있기 때문에 클라이언트에서 쿼리를 작성할때 번거롭게 fetch 나 axios를 사용하지 않고 apollo-client를 이용해서 간단하게 쿼리를 작성 할 수 있다. 코드가 깔끔해진다. 받아온 데이터를 전역적으로 관리 할 수 있기 때문에 context-api나 redux같은 전역 상태관리 라이브러리를 사용하지 않아도 된다. 받은데이터를 자동적으로 캐싱해주기 때문에 반복적인 데이터 요청 작업을 안해서 성능이 좀더 좋아진다.

### Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

fetch나 axios를 통해서 Post요청을 날리면 된다.

```jsx
fetch("${url}/graphql",{
	methods : 'Post",
	headers : {
	"Content-Type" : "application/json",
	"Accept" :"application/json"
		}
	body : JSON.stringify({
			query : `query~~`,
			variables : {token, username}
		})
	}
})
```

위에 코드처럼 post를 통해 body에 쿼리문을 보내면 된다. 이때 query에 $변수명을 선언하고 variables에 변수를 넣어서 좀더 유연한 쿼리문을 작성 할 수 있다.

## GraphQL 기반의 API를 만들 때 에러처리와 HTTP 상태코드 등은 어떻게 하는게 좋을까요?

GraphQL은 자체적으로 대부분 200으로 처리를 하고 데이터를 독립적으로 요청하는 경우보다 여러가지 데이터를 한꺼번에 불러오기 때문에 http응답값을 이용한 애러처리 방법보다는 애러가 발생했을때 객체안에 애러필드를 만들어서 애러처리를 하는게 좋을 것 같다.

```jsx
// client query
{
  user;
  password;
}
```

```jsx
// server response
{
	user : {
		name : "alajillo",
		status : 200
	},
	password : {
		password : '',
		length : '',
		status : 404
	}
	errors : {
		location : [password],
		amount : 1
	}
}
```
