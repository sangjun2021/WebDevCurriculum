# 인터넷은 어떻게 동작하나요? Internet Protocol Suite의 레이어 모델에 입각하여 설명해 보세요.

## 근거리에서 서로 떨어진 두 전자기기가 유선/무선으로 서로 통신하는 프로토콜은 어떻게 동작할까요?

컴퓨터가 이해 가능한 것은 전기가 통하는지 안통하는지 즉 0과 1밖에 없다. 그렇기때문에 미리 이런 신호는 0이고 이런신호는 1이라는 신호라는 것을 정해야한다. 이렇게 정해진 규칙을 프로토콜이라고 한다. 예를들어서 1초동안 10v의 전류를 흘리면 이게 1이고 1초동안 -10v의 전류를흘리면 이게 0이라는 예를들면 좋다. 무선의 경우에는 주파수 혹은 진폭을 통해 1과 0을 구분한다. 물리계층으로 소프트웨어적으로 구현되어있지 않고 물리적 전자회로로 구성되어있다.

## 근거리에 있는 여러 대의 전자기기가 서로 통신하는 프로토콜은 어떻게 동작할까요?

근거리에 있는 여러 대의 전가기기는 스위치에 전선으로 직렬연결되어있고 작은 네트워크가 형성되는데 이때 기기들을 구별하는 역할은 랜카드에 기입되어있는 Mac주소를 활용해서 통신을한다. 프레임단위로 데이터가 오고가고 프레임내부에 Mac주소와 자신의 Mac주소가 다르면 데이터를 파기한다. 데이터 링크 계층로 구분되며 랜카드의 mac주소를 이용한다.

## 아주 멀리 떨어져 있는 두 전자기기가 유선/무선으로 서로 통신하는 프로토콜은 어떻게 동작할까요?

프레임화 된 데이터에 IP주소를 부여하여 패킷화 한다. 패킷에는 IP주소정보와 TTL정보가 들어 있고 IP주소를 토대로 어떤 라우터로 데이터를 전달할지 라우팅테이블을 이용하여 정한뒤 다음 라우터를 데이터를 보낸다. 다음 라우터에 도착하면 패킷을 해체하고 Ip주소를 확인하고 자신의 IP와 동일한 경우 해체된 프레임 데이터를 스위치로 보내고 아니라면 전과 동일한 작업을 통해 다음 라우터로 이동시킨다. 이런과정을 통해 목적지 라우터까지 이동한다. 이때 목적지를 못찾는 패킷이나 무한루프에 빠진 패킷은 TTL을 통해 처리한다. 다음 라우터로 보낼때 TTL값에 1을 뺀 값을 전달하고 받은 TTL이 0이라면 데이터를 폐기한다. 네트워크 계층에 해당되며 라우터의 운영체제 커널에서 소프트웨어로 구현된다. TTL은 8비트로 이루어져있기때문에 0~255까지의 수를 표현할수 있고 다음과 같이 기본값이 설정되어있다.

- Window 운영체제 기반 : TTL=128
  -UNIX 운영체제 기반 : TTL=64

- 그 외 운영체제 : 255
- Window 운영체제 기반 : TTL=128
- UNIX 운영체제 기반 : TTL=64

## 두 전자기기가 신뢰성을 가지고 통신할 수 있도록 하기 위한 프로토콜은 어떻게 동작할까요?

TCP를 이용하여 데이터를 세그먼트로 캡슐화하여 전달한다. 이때 세그먼트에는 헤더에 있는 일련번호, 확인응답 번호, 코드비트를 통해 데이터가 잘 수신되었는지 송신측에서 확인 한다. 코드비트는 6비트로 구성되어 있으며 각 비트자리마다 지정된 의미가 있고 0과1로 활성화여부를 구별한다. 여기서 SYN,ACK에 해당되는 비트의 값을 통해 클라이언트 측에서 SYN를 활성화하여 전송하고 서버측은 ACK,SYN를 모두 활성화하여 다시 전송한다. 클라이언트 측에서 다시 ACK를 전송함으로써 연결이 성립이 되고 이때부터 데이터를 전송한다. 이런 연결과정을 3-way-handshake라고 한다. 데이터가 잘 전송되었는지 확인하기 위해서 3-way-handshake과정에서 일련번호를 넣고 보내고 반대측은 데이터를 잘받았다는 의미에서 확인응답코드에 받은 일련번호를 넣고 새로운 일련번호를 넣어서 전송한다. 전송하는 쪽에서 데이터가 잘 도착했는지를 검증하고 확인응답코드와 일련번호가 다르거나 ACK가 활성화되지않았다면 재전송을 한다. 데이터 전송을 마치고 연결을 종료하는 과정은 SYN대신 FIN을 이용하여 4-way-handshake를 통해 이루어진다.

# HTTP는 어떻게 동작할까요?

HTTP는 메소드,헤더,주소,바디로 구성되어있다. 메서드는 verb라고도 불리며 주어진 데이터에 어떤 작업을 할지를 명시해놓는다. 메서드에는 여러 종류가 있지만 GET,POST,PUT,DELETE가 있다. 헤더에는 보내는 데이터의 타입 과 http 버전, 캐시는 얼마나 가지고 있는지에 대한 부가적인 정보를 담고 있고 주소는 해당 데이터를 보내는 주소가 담겨있고 바디에는 데이터 자체가 들어가있다. 다만 GET메서드를 사용할 경우에는 바디가 비어진다.

http헤더 내부에는 상태코드라는 것이 존재한다. 상태코드는 서버와의 통신결과를 나타낸다. 상태코드는 크게 100,200,300,400,500번대가 존재한다. 100번대는 부가적인 정보를 표현하고 있고 구체적으로 100은 계속해서 요청, 101번은 클라이언트가 프로토콜을 변경했고 서버가 승인, 200번대는 요청된 정보를 성공적으로 응답, 300대는 요청을 완료하기 위해 추가적인 작업필요, 400대는 http 요청이 잘못되었을때, 500대는 서버가 받은 요청에 응할수 없음을 나타낸다.

# 우리가 브라우저의 주소 창에 [www.knowre.com](http://www.knowre.com/) 을 쳤을 때, 어떤 과정을 통해 서버의 IP 주소를 알게 될까요?

- 컴퓨터는 dhcp라는 자동적으로 네트워크 설정을 해주는 기술을 통해 dns resolver서버의 ip주소를 제공받는다. 이때 제공되는 dns resolver서버는 kt,skt등 인터넷 제공자와 공공 dns resolver서버로 나뉜다.
- www.knowre.com이라는 주소를 입력할시에 먼저 브라우저내에 host파일에서 해당 주소가 캐싱되었는지 확인한다.
- 만약에 캐싱되지 않았다면 dns resolver서버에 주소의 ip주소를 요청한다.
- dns resolver서버는 캐싱된 주소가 있는지 확인하고 없는 경우 root dns server에 주소데이터를 보낸다.
- root dns server는 최상위 도메인인 .com을 식별하고 .com dns server의 ip주소를 응답한다.
- dns reslover 서버는 .com dns server에게 주소 데이터를 보낸다.
- .com dns servers는 수신한 데이터를 토대로 knowre.com이라는 dns 서버의 ip주소를 응답한다.
- dns reslover 서버는 [knowre.com](http://knowre.com) dns server에게 주소의 ip주소를 요청한다.
- [knowre.com](http://knowre.com) dns server는 주소에 해당하는 ip값을 가지고 있고 이를 응답한다,
- dns resolver 서버는 받은 ip주소를 최종적으로 전달해준다. 이떄 받은 ip주소의 값은 일정 기간동안 캐싱한다.

# tracert(Windows가 아닌 경우 traceroute) 명령을 통해 [www.google.com](http://www.google.com/) 까지 가는 경로를 찾아 보세요.

## 어떤 IP주소들이 있나요?

## IP주소들은 어디에 위치해 있나요?

        - 192.168.0.1, 경기도 광명
        - 100.72.100.153
        - 10.44.254.56 경기도 광명
        - 10.44.255.0 경기도 광명
        - 10.222.24.106 경기도 광명
        - 10.222.24.116 경기도 광명
        - 10.222.25.251 경기도 광명
        - 142.250.163.48 캘리포니아 마운틴뷰
        - 142.250.162.140 캘리포니아 마운틴뷰
        - 142.250.162.182 캘리포니아 마운틴뷰
        - 108.170.242.193 도쿄
        - 209.85.253.108 캘리포니아 마운틴뷰
        - 209.85.242.44 캘리포니아 마운틴뷰
        - 216.239.41.71 캘리포니아마운틴뷰
        - 72.14.234.67 캘리포니아 마운틴뷰
        - 172.217.161.36 캘리포니아 마운틴뷰
        - 209.85.246.83 캘리포니아 마운틴뷰


# Wireshark를 통해 [www.google.com](http://www.google.com/) 으로 요청을 날렸을 떄 어떤 TCP 패킷이 오가는지 확인해 보세요

## TCP 패킷을 주고받는 과정은 어떻게 되나요?

## 각각의 패킷에 어떤 정보들이 담겨 있나요?

        클라이언트 → 서버 [SYN],Seq=0, Win=65535

        서버 → 클라이언트 [ACK,SYN],Seq=0,Ack=1,Win=65535

        클라이언트 → 서버 [ACK],Seq=1,Ack=1,Win=131840,Len=0

        서버 → 클라이언트 [ACK],Seq=1,Ack=723,Win=67072

        클라이언트→서버 [ACK],Seq=723,Ack=335,Win=131520

        서버 → 클라이언트 [ACK], Seq=335,Ack=889,Win=131520

        클라이언트 → 서버 (TCPKeep-Alive) [ACK],seq=4954,Ack=46456,Win=131570

        서버 → 클라이언트 (TCPKeep-Alive ACK)[ACK],seq=46456,Ack=4955,Win=131570

        클라이언트 → 서버 ([ACK],seq=4955,Ack=46529,Win=130944

        클라이언트 → 서버  [FIN,ACK],seq=4955,Ack=46529,Win=131072

        서버 → 클라이언트 [FIN,ACK],seq=46529,Ack=4956,Win=93440

        서버 → 클라이언트 [ACK],seq=46456,Ack=46530,Win=131072

        초기에 3way handshaker를 통해 연결을 성립한다. 이때 비트부호의 SYN와 ACK를 이용하여 연결을 요청하고 연결을 수락하는 3번의 tcp를 주고받는다. 실제 데이터의 요청과 응답은 암호화된 TLS프로토콜을 이용한다. 연결을 종료할때에는 FIN,ACK를 이용하여 4 way handshake를 이용한다. seq는 원래 0이 아니지만 와이어샤크에서는 상대적인 값을 적용하여 최초값은무조건0으로 시작한다. 데이터를 받은 수신측은 seq + 데이터의 크기를 붙여서 ack를보냄으로써 데이터가 잘 전달되었는지 알려준다. window값인 현재자신의 버퍼공간에 남은 공간을 말한다.


# telnet 명령을 통해 [http://www.google.com/](http://www.google.com/) URL에 HTTP 요청을 날려 보세요.

## 어떤 헤더들이 있나요?

## 그 헤더들은 어떤 역할을 하나요?

        Date: HTTP 메시지를 생성한 일시
        Expires: 응답 컨텐츠가 언제 까지 유효한지를 나타낸다.Cash-Control이 있는 경우무시된다.
        Cache-Control: 캐시를할지 말지와 캐시의 유효기간을나타낸다.
        Content-Type: 컨텐츠의 MIME타입
        P3P: 웹사이트의 개인정보 보호정책의 기준
        Server: 요청을 처리하는 소프트웨어의 이름
        X-XSS-Protection: xss공격을 방어하는 필터링의 상태
        X-Frame-Options: <frame>과 같은 외부페이지와 연결되는 태그를렌더링할지 여부
        Set-Cookie: 브라우저에게 쿠기를 전송
        path= 응답한 경로
        Accept-Ranges: 파일을 다운받는중 끊길경우 이어받는 것을 허용하는지 여부를 설정한다.
        Vary: 서버로 부터 받은 응답을 캐싱하여 새로운 요청을 보낼때 요청대신에 캐싱한 것을 사용할지를 결정
        Transfer-Encoding: 메시지 바디의 컨텐츠를 어떤 방식으로 인코딩할지를 나타낸다.


# HTTP의 최신 버전인 HTTP/3는 어떤 식으로 구성되어 있을까요?

    기존의 HTTP 1,2는 TCP의 기반을 둔 프로토콜이지만 HTTP3는 UDP을 기반으로 한 프로토콜이다. 완전히 UDP를 이용하는것이 아니라 UDP를 기반으로 만들어진 QUIC 프로토콜을 기반으로 작동한다. TCP가 연결을 할시에 window 버퍼크기를 서로 공유하면서 흐름제어를 한다면 UDP는 connection ID값이 헤더에 실려있어서 이를 통해서 서로의 버퍼크기를 공유하기때문에 연결단계가 필요없어서 속도가 빠르고 IP가 변경되더라도 지속적인 통신이 가능하다.

# TCP/IP 외에 전세계적인 네트워크를 구성하기 위한 다른 방식도 제안된 바 있을까요?

최초에는 OSI 7계층 모델이 제시되었지만 기존의 장비들을 최대한 재활용하기 위해서 대안으로 TCP/IP 모델을 채택하여 사용하고 있다.