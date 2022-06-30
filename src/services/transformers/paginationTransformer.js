export const hydratePagination = (data) => {
  return {
    //page: data.page,
    //size: data.size,
    totalCount: data.totalCount,
    //totalPage: data.totalPage,
  };
};
