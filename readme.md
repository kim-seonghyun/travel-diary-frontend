# SSAFY12_광주5_관통_Spring_8팀_이영석_김성현

## :pushpin: 1. 프로젝트 구성
### 프로젝트 개요

이번 Vue 관통 프로젝트에서는 Spring으로 구현한 REST API를 통해 프론트엔드와 백엔드가 데이터를 요청하고 응답하며 상호작용하는 구조를 설계했습니다.
사용자에게 여행 관련 콘텐츠를 제공하며, 외부 데이터와 API를 활용하여 다양한 기능을 추가하였습니다.
프로젝트는 Vue를 기반으로 컴포넌트를 설계하고, Axios를 활용하여 API 요청 및 응답 처리를 기본으로 진행했습니다.
이를 통해 사용자 중심의 여행 정보 서비스와 더불어 외부 데이터를 활용한 확장 가능성을 보여주는 기능들을 구현했습니다.


### 팀 구성
|   이름    |        역할         |
| :-----: | :---------------: |
| 이영석(팀장) | 로그인, 회원가입, 카카오 API 연동, 여행지 검색, 여행지 상세조회 |
|   김성현   |   여행기 목록 조회   |

### 기술 스택
|           FrontEnd           |
| :-------------------------: |
| Vue, Vite |

### Vue 파일 구조

```
vue-trip-project
├── public
├── src
│   ├── assets
│   │   └── index.css
│   ├── components
│   │   ├── icons
│   │   ├── ui
│   │   │   ├── button
│   │   │   │   ├── Button.vue
│   │   │   │   └── index.js
│   │   │   ├── card
│   │   │   │   ├── Card.vue
│   │   │   │   ├── CardContent.vue
│   │   │   │   ├── CardDescription.vue
│   │   │   │   ├── CardFooter.vue
│   │   │   │   ├── CardHeader.vue
│   │   │   │   ├── CardTitle.vue
│   │   │   │   └── index.js
│   │   │   ├── select
│   │   │   │   ├── Select.vue
│   │   │   │   ├── SelectContent.vue
│   │   │   │   ├── SelectGroup.vue
│   │   │   │   ├── SelectItem.vue
│   │   │   │   ├── SelectItemText.vue
│   │   │   │   ├── SelectLabel.vue
│   │   │   │   ├── SelectScrollDownButton.vue
│   │   │   │   ├── SelectScrollUpButton.vue
│   │   │   │   ├── SelectSeparator.vue
│   │   │   │   ├── SelectTrigger.vue
│   │   │   │   ├── SelectValue.vue
│   │   │   │   └── index.js
│   │   │   ├── switch
│   │   │   │   ├── Switch.vue
│   │   │   │   ├── Content.vue
│   │   │   │   ├── Header.vue
│   │   │   │   ├── KakaoMapView.vue
│   │   │   │   ├── LocateSelect.vue
│   │   │   │   ├── Navbar.vue
│   │   │   │   └── index.js
│   ├── lib
│   │   └── utils.js
│   ├── router
│   │   └── index.js
│   ├── stores
│   │   └── counter.js
│   ├── views
│   │   ├── Login.vue
│   │   ├── Main.vue
│   │   ├── Mypage.vue
│   │   ├── Register.vue
│   │   ├── SearchTravel.vue
│   │   ├── TravelDetail.vue
│   │   └── App.vue
│   ├── main.js

```



### Vue 구현 및 기능
#### 여행지 검색, 지역별 검색기능
- 기능: 지역별 여행지 조회 기능
- 적용 방법: rest-api를 axios로 요청하여 데이터를 전송받고 component에 출력한다.

#### 마이페이지 기능
- 기능: 로그인 한 유저의 정보 및 여행성향분석 그래프와 내 도토리(포인트) 조회기능.
- 적용 방법: rest-api를 axios로 요청하여 데이터를 전송받고 vue에 출력.

#### 여행지 상세보기 기능
- 기능: 여행지 리스트에 뜬 여행지를 클릭하면 상세 정보 및 위치를 지도에 출력한다.
- 적용 방법: REST API를 axios로 호출하여 여행지 데이터를 Vue 컴포넌트에서 출력합니다.위도와 경도 데이터를 활용해         KakaoMap      API로 해당 위치를 지도에 표시합니다.

#### 사용자 여행기 목록 조회 기능
- 기능 : 사용자가 추가한 여행기 목록을 확인할 수 있습니다.
- 적용 방법 : REST API를 axios로 호출하여 여행기 목록을 Vue 컴포넌트에서 출력합니다.




## 시현 영상
### 여행지 검색, 지역별 검색 및 여행지 상세보기 (KakaoMap API)
![여행지조회__상세보기](/uploads/d1a01ad1f18734d35d3cb4cfc3508fb1/여행지조회__상세보기.gif)

### 마이페이지
![마이페이지](/uploads/9007f619961acca373066848bef5c530/마이페이지.gif)
### 로그인, 회원가입
![로그인_회원가입](/uploads/9597eacabb21befd80a37b0c047c0a88/로그인_회원가입.gif)

### 사용자 여행기 목록 조회 기능
![여행기목록](/uploads/94f9d92f9724fe6ad04d8c5b029d9cc4/여행기목록.gif)

