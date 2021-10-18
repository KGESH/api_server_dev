# Collabo API Server

---

## Description
백엔드 배포 자동화 진행중


## Environment
- GCP VM e2-small(vCPU 2개, 2GB 메모리)
  - Ubuntu 18.04
  - Docker
  - Jenkins in docker

## How to run

- #### Local Dev
<pre>
npm start
</pre>


- #### Build & Deploy
  - Jenkins 컨테이너에서 빌드
  - 문제없으면 remote main branch로 통합 (구현중)
  - 빌드, 통합 이후 서버 실행
<pre>
git push origin deploy
</pre>


- #### Build & Test
  - 아직 미완성
  - Jenkins 컨테이너에서 빌드
  - 빌드 후 테스팅
  - 서버는 실행하지 않음
<pre>
git push origin build
</pre>

## Management
- Jenkins
  - http://34.64.157.141:8080/

- Portainer
  - http://34.64.157.141:9000/


## Build


