export const isStaff = (member: number) => {
  if (member > 100 && member < 200) return true;
  else return false;
};

export const isMember = (member: number) => {
  if (member > 200 && member < 300) return true;
  else return false;
};

export const isSalesTeam = (member: number) => {
  if (member === 900) return true;
  else return false;
};
