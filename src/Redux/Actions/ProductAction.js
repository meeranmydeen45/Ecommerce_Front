import { FETCH_DATA, CHANGE_SIZE_INDEX } from './ActionTypes';

export const fetchData = (data) => {
  const indexArray = data.map((item, index) => {
    return {
      ProdId: item.id,
      SizeIndex: 0,
    };
  });

  return {
    type: FETCH_DATA,
    payload: {
      data: data,
      indexArray: indexArray,
    },
  };
};

export const changeSizeIndex = (prodId, sizeIndex, indexArray) => {
  const indexArrayList = [...indexArray];
  indexArrayList[prodId - 1].SizeIndex = sizeIndex;

  return {
    type: CHANGE_SIZE_INDEX,
    payload: {
      indexArray: indexArrayList,
    },
  };
};
