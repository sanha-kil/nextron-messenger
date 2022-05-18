# Nextron Messanger

## 개요
- nextron.js(next.js + electron.js)를 이용한 메신저 어플리케이션

## 사용 스택
- React.js
- nextron.js
- firebase
- styled-components

## 사용법
### 로그인/회원가입
- 첫 로그인 화면에서 로그인할 수 있으며, 회원가입 페이지로 이동 후 회원가입을 할 수 있습니다.
- 아이디는 이메일 형식, 비밀번호는 6글자 이상이어야 합니다.
### 사이드바
- 사이드바의 버튼은 유저목록, 그룹채팅목록, 로그아웃 순입니다.
### 1:1 채팅
- 유저 목록에서 채팅을 하고 싶은 특정 유저를 클릭하면 해당 유저와의 1:1 채팅방으로 이동합니다.
### 그룹채팅
- 그룹채팅 페이지 우측 상단 버튼을 통해 새로운 그룹채팅방을 만들 수 있습니다.
- 그룹채팅 목록에서 특정 그룹 채팅을 클릭하면 해당 그룹채팅 페이지로 이동합니다.

## 구조 
```
├── main
│   └── // 일렉트론 관련 설정
│
└── renderer
    ├── pages
    │   ├── _app.tsx                  // 공통 레이아웃
    │   ├── index.tsx                 // 로그인 페이지 라우팅
    │   ├── list.tsx                  // 그룹채팅 리스트 페이지 라우팅
    │   ├── signup.tsx                // 회원가입 페이지 라우팅
    │   └── users.tsx                 // 유저목록 페이지 라우팅
    │ 
    ├── styles 
    │   └── GlobalStyles.ts           // 전역 스타일 및 uas
    │
    ├── src
    │   ├── components
    │   │   ├── Modal.tsx             // 모달 컴포넌트
    │   │   └── SideBar.tsx           // 사이드 네비게이션 컴포넌트
    │   │
    │   ├── hooks
    │   │   └── useGetChatting.ts     // 파이어베이스 실시간 채팅 반영을 위한 훅
    │   │
    │   └── containers
    │       ├── ChatList.tsx          // 그룹채팅 리스트 컨테이너
    │       ├── ChatRoom.tsx          // 채팅방 컨테이너
    │       ├── Login.tsx             // 로그인 컨테이너
    │       ├── SignUp.tsx            // 회원가입 컨테이너
    │       └── Users.tsx             // 유저목록 컨테이너
    │
    └── firebase.ts                   // 파이어베이스 설정 파일
```

### 설치
- Window : http://naver.me/55nfAM6x
- mac : http://naver.me/FXLJ88lf