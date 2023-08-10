# 여긴 어디?

![image](/uploads/439d3e0fdd7701e192144d613e2ef74f/image.png)

### **여행 스케쥴링 전 모르는 장소의 사진을 넣어 어떤 장소인지 미리 파악하고 해당 장소를 기준으로 주변에 갈만한 장소를 추천해주고 일정을 구성해주는 프로젝트**

## 1. 프로젝트 구성 안내

<br />

- 서비스 명 : 여긴 어디?

- 개발 기간 : 2023.07.10 ~ 2023.08.12

- 주제 : 모르는 장소 사진을 검색하여 정보를 얻고 여행 계획을 미리 구성

- 목표 : 국내 관광객 의외에도 외국인들이 한국을 방문하기 전에 폭 넓게 정보를 얻게 하기

- 배포 페이지 : [바로 가기](http://kdt-ai7-team07.elicecoding.com/)


<br />

## 2. 프로젝트 소개

<br />

### 📊 사용한 데이터

<br />

데이터 수집은 Ai허브 사이트를 통해 진행하였습니다.
<br/>이번 프로젝트에서 사용한 데이터는 국내 랜드마크 이미지 데이터 중 서울의 랜드마크 데이터를 이용하여 프로젝트를 진행하였습니다.<br/> 데이터는 인공지능 모델에 학습시키기 위해 사용하였으며, 이미지는 데이터셋 내의 label 데이터의 bounding box 좌표를 참고하여 crop하여 활용하였습니다.

<br />


### 🔧 사용한 기술 스택 및 설명

<br />

#### **프론트엔드**

<div>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-41454A?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>

</div>


- 리액트를 사용하여 클라이언트를 구성.
- Tailwind의 클래스 제어를 통해 CSS 구현.
- ReactRouter의 인스턴스를 통해 서버와의 통신.


<br />

## 3. 프로젝트 기획 및 목표

<br />

- 프로젝트 아이디어 동기 : 최근 뉴스에서 외국인들이 한국을 방문했을 때 구글 맵스가 잘 통하지 않는다는 뉴스를 접함
- 프로젝트 진행 전 팀원들이 모두 데이터를 수집하고 이를 바탕으로 투표를 진행하여 주제를 정하고 팀원들끼리 해당 데이터에 대해 논의함.
- 이미지 데이터를 통해 궁금한 장소의 검색 결과를 도출하고 이를 바탕으로 여행 계획까지 구상할 수 있도록 웹사이트 자체 컨텐츠를 기획함.

<br />

## 4. 프로젝트 기능 설명

### **주요 기능**

- 이미지를 입력하여 해당 이미지가 어떤 장소인지 검색
- 검색된 이미지의 정보를 띄워주고 주변에 가볼만한 장소를 검색
- 검색한 이미지를 포함하여 여행 계획을 구상


### **서브 기능**

- 장소 북마크 기능

<br />

## 5. 프로젝트 팀원 역할 분담

<br />

| 이름   | 담당 업무        |
| ------ | ---------------- |
| 방석진 | 팀장/인공지능    |
| 박은희 | 프론트엔드 개발  |
| 김태은 | 프론트엔드 개발  |
| 이로운 | 프론트엔드 개발  |
| 장나연 | 백엔드 개발      |
| 김지우 | 백엔드 개발      |

<br />
