import { GraphQLUpload } from 'graphql-upload';

export default {
  /** File upload를 위한 스칼라
   * apollo server 2.x에 기본 탑재되었지만,
   * 3.x 부터 호환성 문제로 없어짐
   * 외부 모듈 graphql-upload에 의존
   * (21-09-04:지성현)
   */
  Upload: GraphQLUpload,
};
