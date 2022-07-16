import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  directionDataSec: '',
  latitudeDataSec: '',
  longitudeDataSec: '',
  locReadyToAddDataSec: false,
};

export const locationDataSecSlice = createSlice({
  name: 'locationDataSec',
  initialState,
  reducers: {
    setDirectionDataSec: (state, action) => {
      state.directionDataSec = action.payload;
    },
    setLatitudeDataSec: (state, action) => {
      state.latitudeDataSec = action.payload;
    },
    setLongitudeDataSec: (state, action) => {
      state.longitudeDataSec = action.payload;
    },
    setLocReadyToAddDataSec: (state, action) => {
      state.locReadyToAddDataSec = action.payload;
    },
  },
});

export const { setDirectionDataSec, setLatitudeDataSec, setLongitudeDataSec, setLocReadyToAddDataSec } =
  locationDataSecSlice.actions;

export const directionDataSecSelector = createSelector(
  (state) => state.locationDataSec,
  (locationDataSec) => locationDataSec.directionDataSec
);

export const latitudeDataSecSelector = createSelector(
  (state) => state.locationDataSec,
  (locationDataSec) => locationDataSec.latitudeDataSec
);

export const longitudeDataSecSelector = createSelector(
  (state) => state.locationDataSec,
  (locationDataSec) => locationDataSec.longitudeDataSec
);

export const locReadyToAddDataSecSelector = createSelector(
  (state) => state.locationDataSec,
  (locationDataSec) => locationDataSec.locReadyToAddDataSec
);

export default locationDataSecSlice.reducer;
