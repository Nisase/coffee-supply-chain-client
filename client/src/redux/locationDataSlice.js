import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  directionData: '',
  latitudeData: '',
  longitudeData: '',
  // locMessageData: '',
  locReadyToAddData: false,
};

export const locationDataSlice = createSlice({
  name: 'locationData',
  initialState,
  reducers: {
    setDirectionData: (state, action) => {
      state.directionData = action.payload;
    },
    setLatitudeData: (state, action) => {
      state.latitudeData = action.payload;
    },
    setLongitudeData: (state, action) => {
      state.longitudeData = action.payload;
    },
    // setLocMessageData: (state, action) => {
    //   state.locMessageData = action.payload;
    // },
    setLocReadyToAddData: (state, action) => {
      state.locReadyToAddData = action.payload;
    },
  },
});

export const {
  setDirectionData,
  setLatitudeData,
  setLongitudeData,
  // setLocMessageData,
  setLocReadyToAddData,
} = locationDataSlice.actions;

export const directionDataSelector = createSelector(
  (state) => state.locationData,
  (locationData) => locationData.directionData
);

export const latitudeDataSelector = createSelector(
  (state) => state.locationData,
  (locationData) => locationData.latitudeData
);

export const longitudeDataSelector = createSelector(
  (state) => state.locationData,
  (locationData) => locationData.longitudeData
);

// export const locMessageDataSelector = createSelector(
//   (state) => state.locationData,
//   (locationData) => locationData.locMessageData
// );

export const locReadyToAddDataSelector = createSelector(
  (state) => state.locationData,
  (locationData) => locationData.locReadyToAddData
);

export default locationDataSlice.reducer;
