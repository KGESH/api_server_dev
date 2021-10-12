import { gql } from 'apollo-server-express';

// query

export const GET_CAFE_BY_CAFE_ID = gql`
  query ($cafe_id: Int!) {
    getCafeByCafeId(cafe_id: $cafe_id) {
      cafe_id
      owner_id
      staff {
        staff_id
        staff_name
        staff_phone
        staff_position
        enroll
      }
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

export const GET_MENU_BY_CAFE_ID = gql`
  query ($cafe_id: Int!) {
    getMenuByCafeId(cafe_id: $cafe_id) {
      cafe_id
      title
      menu {
        link
        menu_name
        price
        beans
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
        enroll
      }
    }
  }
`;

export const ENROLL_STAFF = gql`
  mutation ($cafe_id: Int!, $staff_id: Int!) {
    permitStaff(cafe_id: $cafe_id, staff_id: $staff_id) {
      cafe_id
      staff {
        staff_id
        staff_name
        staff_phone
        staff_position
        enroll
      }
    }
  }
`;

export const DELETE_STAFF = gql`
  mutation ($cafe_id: Int!, $staff_id: Int!) {
    deleteStaff(cafe_id: $cafe_id, staff_id: $staff_id) {
      cafe_id
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation ($cafe_id: Int!, $title: String!) {
    addCategory(cafe_id: $cafe_id, title: $title) {
      cafe_id
    }
  }
`;

export const ADD_MENU = gql`
  mutation ($cafe_id: Int!, $link: String!, $menu_name: String!, $beans: String!, $price: Int!) {
    saveMenu(cafe_id: $cafe_id, link: $link, menu_name: $menu_name, beans: $beans, price: $price) {
      cafe_id
    }
  }
`;
