export const selectDeviceID = (state) => state.device.id;
export const selectInfoLoading = (state) => state.infos.loading;
export const selectBorderInformationEntires = (state) => state.infos.entries;
export const selectFeedbackStatus = (state) => state.feedback.status;

export const selectEntrieswithoutUserReported = (deviceID) => (state) =>
  state.infos.entries.filter((info) => !info.report.reporters.includes(deviceID));
