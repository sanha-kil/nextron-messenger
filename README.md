# Nextron Messanger

## 개요
- nextron.js(next.js + electron.js)를 이용한 메신저 어플리케이션

## 사용 스택
- React.js
- nextron.js
- firebase
- styled-components

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