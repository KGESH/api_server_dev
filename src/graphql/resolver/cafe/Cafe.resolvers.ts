import {
  FindAllCafe,
  FindCafeByCafeId,
  FindCafeByOwnerId,
  FindCafeByStaffId,
} from '@db/cafe/FindCafe';
import { ICafe } from '@db/cafe/CafeModel';
import { FindDummyData } from '@db/temp-cafe/FindTempCafe';
import { IMenu } from '@db/menu/MenuModel';
import { FindMenuList } from '@db/menu/FindMenu';
import { ISaveStaff, SaveStaff } from '@db/cafe/SaveCafe';
import { DeleteStaff, PermitStaff, UpdateCafeDesc } from '@db/cafe/UpdateCafe';
import { AddCategory, DeleteCategory, DeleteMenu, SaveMenu, UpdateMenu } from '@db/menu/UpdateMenu';
import { PermitEnroll, SaveTempCafe } from '@db/temp-cafe/SaveTempCafe';
import { DeleteTempCafe } from '@db/temp-cafe/UpdateTempCafe';

export default {
  Query: {
    /** 카페 전체 조회 [params: none](21-8-13:지성현) */
    getAllCafe: (_: any, __: any) => FindAllCafe(),
    /** cafe_id로 해당 카페 조회 (수정21-9-3:유성현) */
    getCafeByCafeId: (_: any, { cafe_id }: ICafe) => FindCafeByCafeId(cafe_id),
    /** owner_id로 해당 카페들 조회 (21-9-3:유성현) */
    getCafeByOwnerId: (_: any, { owner_id }: ICafe) => FindCafeByOwnerId(owner_id),
    /** staff_id로 해당 카페 조회 (21-10-6:유성현) */
    getCafeByStaffId: (_: any, { staff_id }: any) => FindCafeByStaffId(staff_id),
    /** 등록 대기중인 상태의 카페 조회 (21-9-19:유성현) */
    getTempCafe: () => FindDummyData(),
    /** cafe_id로 해당 카페의 메뉴 조회 (21-9-22:유성현) */
    getMenuByCafeId: (_: any, { cafe_id }: IMenu) => FindMenuList(cafe_id),
  },
  Mutation: {
    /** 카페 정보 수정 (21-9-12:유성현) */
    updateCafeDesc: (_: any, cafe_info: any) => UpdateCafeDesc(cafe_info),

    /** 직원 초기 등록/승인/삭제 (21-9-10:유성현) */
    saveStaff: (_: any, staffData: ISaveStaff) => SaveStaff(staffData),
    permitStaff: (_: any, staffData: ISaveStaff) => PermitStaff(staffData),
    deleteStaff: (_: any, { cafe_id, staff_id }: any) => DeleteStaff(cafe_id, staff_id),

    /** 메뉴 추가/삭제/수정 (21-9-24:유성현) */
    saveMenu: (_: any, params: IMenu) => SaveMenu(params),
    deleteMenu: (_: any, params: IMenu) => DeleteMenu(params),
    updateMenu: (_: any, params: IMenu) => UpdateMenu(params),

    /** 메뉴 카테고리 추가/삭제 (21-9-22:유성현) */
    addCategory: (_: any, params: IMenu) => AddCategory(params),
    deleteCategory: (_: any, params: IMenu) => DeleteCategory(params),

    /** 사업자 초기 등록/승인/취소&삭제 (21-9-17:유성현) */
    saveTempCafe: (_: any, dummy: any) => SaveTempCafe(dummy),
    enrollCafe: (_: any, params: any) => PermitEnroll(params),
    deleteTempCafe: (_: any, params: any) => DeleteTempCafe(params),
  },
};
