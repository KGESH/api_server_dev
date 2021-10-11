import {gql} from "apollo-server-express";

// query

export const GET_CAFE_BY_CAFE_ID = gql`
  query ($cafe_id: Int!) {
    getCafeByCafeId(cafe_id: $cafe_id) {
      cafe_id
      owner_id
    }
  }
`;

export const GET_TEMP_CAFES = gql`
  query {
    getTempCafe {
      cafe_id
      owner_id
      cafe_info {
        cafe_name
      }
    }
  }
`;

// mutation

export const SAVE_TEMP_CAFE = gql`
  mutation (
    $location: String
    $owner_id: Int!
    $name: String!
    $phone: String
    $cafe_name: String
    $address: String
    $address_detail: String
    $cafe_phone: String
    $silver: Int
    $gold: Int
    $vip: Int
  ) {
    saveTempCafe(
      location: $location
      owner_id: $owner_id
      name: $name
      phone: $phone
      cafe_name: $cafe_name
      address: $address
      address_detail: $address_detail
      cafe_phone: $cafe_phone
      silver: $silver
      gold: $gold
      vip: $vip
    ) {
      owner_id
    }
  }
`;

export const SAVE_STAFF = gql`
  mutation (
    $cafe_id: Int!
    $staff_id: Int!
    $staff_name: String!
    $staff_phone: String!
    $staff_position: String!
  ) {
    saveStaff(
      cafe_id: $cafe_id
      staff_id: $staff_id
      staff_name: $staff_name
      staff_phone: $staff_phone
      staff_position: $staff_position
    ) {
      cafe_id
      staff {
        staff_id
        staff_name
        staff_phone
        staff_position
      }
    }
  }
`;
