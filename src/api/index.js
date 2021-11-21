import axios from 'axios';
import router from 'next/router';

const iAxios = axios.create({
  baseURL: process.env.apiBaseURL,
  // timeout: 1000,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
});

iAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

iAxios.interceptors.request.use(config => {
  if (window.Echo) {
    config.headers['X-Socket-ID'] = window.Echo.socketId();
  }

  return config;
});

const getAllDockReceipts = (page = 1, perPage = 15, params = {}) => {
  const defaultParams = {
    include: 'verified,shipper',
    sort: '-id',
    per_page: perPage,
    page,
    ...params
  };
  return iAxios.get(`/dock-receipts`, {
    params: defaultParams
  });
};

const getDockReceipt = id => {
  return iAxios.get(`/dock-receipts/${id}`);
};

const getShipperAll = (params = {}) => {
  return iAxios.get('/shippers', { params });
};

const getDepartmentAll = (params = {}) => {
  return iAxios.get('/departments', { params });
};

const postAddDepartment = (params = {}) => {
  return iAxios.post('/departments', params);
};

const putUpdateDepartment = (deptId, params = {}) => {
  return iAxios.put(`/departments/${deptId}`, params);
};

const deleteDepartment = (deptId, params = {}) => {
  return iAxios.delete(`/departments/${deptId}`, params);
};

const getUsersAll = (params = {}) => {
  return iAxios.get('/users', { params });
};

const postCreateUser = (params = {}) => {
  return iAxios.post('/users', params);
};

const getUserProfileImage = (userId, params = {}) => {
  return iAxios.get(`/users/${userId}/profile-image`, { params });
};

const postAddUserToDepartment = (userId, departmentId, params = {}) => {
  return iAxios.post(`/users/${userId}/department/${departmentId}`, params);
};

const postUpdateUser = (userId, params = {}) => {
  return iAxios.post(`/users/${userId}`, params);
};

const removeUserToDepartment = (userId, departmentId, params = {}) => {
  return iAxios.delete(`/users/${userId}/department/${departmentId}`, {
    params
  });
};

const assignUserRole = (userId, params = {}) => {
  return iAxios.post(`/users/${userId}/assign-role`, params);
};

const getBolAll = (params = {}) => {
  return iAxios.get('/bol', { params });
};

const getSearchByDr = (params = {}) => {
  return iAxios.get('/dock-receipts/search-dr', { params });
};

const postCreateDockReceipt = (params = {}) => {
  return iAxios.post('/dock-receipts', params);
};

const putUpdateDockReceipt = (dockReceiptId, params = {}) => {
  return iAxios.put(`/dock-receipts/${dockReceiptId}`, params);
};

const postAddCostDept = (dockReceiptId, params = {}) => {
  return iAxios.post(`/dock-receipts/${dockReceiptId}/add-cost-dept`, params);
};

const deleteCostDept = (dockReceiptId, costDeptId) => {
  return iAxios.delete(
    `/dock-receipts/${dockReceiptId}/delete-cost-dept/${costDeptId}`
  );
};

const putUpdateCostDept = (dockReceiptId, costDeptId, params = {}) => {
  return iAxios.put(
    `/dock-receipts/${dockReceiptId}/update-cost-dept/${costDeptId}`,
    params
  );
};

const postAddCost = (dockReceiptId, params = {}) => {
  return iAxios.post(`/dock-receipts/${dockReceiptId}/add-cost`, params);
};

const putUpdateCostDr = (dockReceiptId, costId, params = {}) => {
  return iAxios.put(
    `/dock-receipts/${dockReceiptId}/update-cost/${costId}`,
    params
  );
};

const deleteCostDr = (dockReceiptId, costId, params = {}) => {
  return iAxios.delete(
    `/dock-receipts/${dockReceiptId}/delete-cost/${costId}`,
    { params }
  );
};

const getCostTypesAll = () => {
  return iAxios.get('/cost-types');
};

const getGlCodeCostAll = (params = {}) => {
  return iAxios.get('/gl-codes/search', { params });
};

const getDeptAll = (params = {}) => {
  return iAxios.get('/dept/search', { params });
};

const getCostByDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.get(`/cost/dock-receipt/${dockReceipt}`, { params });
};

const getFilesByDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.get(`/files/dock-receipt/${dockReceipt}`, { params });
};

const getFilesByBol = (bolId, params = {}) => {
  return iAxios.get(`/files/bol/${bolId}`, { params });
};

const postUploadFileDockReceipt = (dockReceipt, params = {}, config = {}) => {
  return iAxios.post(`/files/dock-receipt/${dockReceipt}/upload`, params, {
    headers: {
      Accept: '*/*'
    },
    ...config
  });
};

const postUploadFileBol = (bolId, params = {}, config = {}) => {
  return iAxios.post(`/files/bol/${bolId}/upload`, params, {
    headers: {
      Accept: '*/*'
    },
    ...config
  });
};

const postUploadFileAvatar = (userId, params = {}, config = {}) => {
  return iAxios.post(`/files/avatar/${userId}/upload`, params, {
    headers: {
      Accept: '*/*'
    },
    ...config
  });
};

const getApproveDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.get(`/dock-receipts/${dockReceipt}/approve`, { params });
};

const getForApprovalDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.get(`/dock-receipts/${dockReceipt}/for-approval`, { params });
};

const postRejectDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.post(`/dock-receipts/${dockReceipt}/reject`, params);
};

const getAssignDockReceipt = (dockReceipt, params = {}) => {
  return iAxios.get(`/dock-receipts/${dockReceipt}/assign`, { params });
};

const putAssignDockReceipt = (dockReceiptId, params = {}) => {
  return iAxios.put(`/dock-receipts/${dockReceiptId}/assign`, params);
};

const putEditDrBolPage = (dockReceipt, params = {}) => {
  return iAxios.put(`/dock-receipts/${dockReceipt}/edit-bol-page`, params);
};

const getComments = (params = {}) => {
  return iAxios.get(`/comments`, { params });
};

const getShippers = (params = {}) => {
  return iAxios.get(`/shippers`, { params });
};

const postAddShipper = (params = {}) => {
  return iAxios.post('/shippers', params);
};

const putUpdateShipper = (shipperId, params = {}) => {
  return iAxios.put(`/shippers/${shipperId}`, params);
};

const deleteShipper = (shipperId, params = {}) => {
  return iAxios.delete(`/shippers/${shipperId}`, params);
};

const putUpdateCostType = (costTypeId, params = {}) => {
  return iAxios.put(`/cost-types/${costTypeId}`, params);
};

const postCreateCostType = (params = {}) => {
  return iAxios.post(`/cost-types`, params);
};

const getGlCodeCosts = (params = {}) => {
  return iAxios.get(`/gl-code-cost`, { params });
};

const postAddGlCodeCosts = (params = {}) => {
  return iAxios.post('/gl-code-cost', params);
};

const putUpdateGlCodeCosts = (glCodeCostsId, params = {}) => {
  return iAxios.put(`/gl-code-cost/${glCodeCostsId}`, params);
};

const deleteGlCodeCosts = (glCodeCostsId, params = {}) => {
  return iAxios.delete(`/gl-code-cost/${glCodeCostsId}`, params);
};

const getBols = (page = 1, perPage = 15, addtlParams) => {
  const params = {
    append: 'cube_cost',
    sort: '-id',
    page,
    per_page: perPage,
    ...addtlParams
  };
  return iAxios.get(`/bol`, {
    params
  });
};

const postCreateBol = (params = {}) => {
  return iAxios.post('/bol', params);
};

const putUpdateBol = (bolId, params = {}) => {
  return iAxios.put(`/bol/${bolId}`, params);
};

const postAddCostBol = (bolId, params = {}) => {
  return iAxios.post(`/bol/${bolId}/add-cost`, params);
};

const getCostTypesBolAll = () => {
  return iAxios.get('/cost-types-bol');
};

const postAddCostTypeBol = (params = {}) => {
  return iAxios.post('/cost-types-bol', params);
};

const putUpdateCostTypeBol = (costTypeBolId, params = {}) => {
  return iAxios.put(`/cost-types-bol/${costTypeBolId}`, params);
};

const deleteCostTypeBol = (costTypeBolId, params = {}) => {
  return iAxios.delete(`/cost-types-bol/${costTypeBolId}`, params);
};

const deleteBolCost = bolId => {
  return iAxios.delete(`/bol-cost/${bolId}`);
};

const putUpdateBolCost = (bolId, params = {}) => {
  return iAxios.put(`/bol-cost/${bolId}`, params);
};

const getDrStatus = (params = {}) => {
  return iAxios.get('/dr-status', { params });
};

const postNewDrMessage = (dockReceiptId, params = {}) => {
  return iAxios.post(`/dr-status/new-message/${dockReceiptId}`, params);
};

const postSendEmail = (params = {}) => {
  return iAxios.post('/mail/send', params);
};

const postForceNotifyBuyerEmail = (dockReceiptId, params = {}) => {
  return iAxios.post(`/mail/force-notify-buyer/${dockReceiptId}`, { params });
};

const getAllRoles = (params = {}) => {
  return iAxios.get('/roles', { params });
};

const getNotifications = (params = {}) => {
  return iAxios.get('/notifications', { params });
};

const getMarkAsReadNotification = (notificationId, params = {}) => {
  return iAxios.get(`/notifications/${notificationId}/mark-as-read`, { params });
};

const getMarkAsReaAllNotification = (userId, params = {}) => {
  return iAxios.get(`/notifications/${userId}/mark-as-read-all`, { params });
};

const getAudits = (params = {}) => {
  return iAxios.get('/audits', { params });
};

const postResetPassword = (params = {}) => {
  return iAxios.post('/users/reset-password', params);
};

const deleteFile = (fileId, params = {}) => {
  return iAxios.delete(`/files/${fileId}`, params);
};

export {
  getAllDockReceipts,
  getDockReceipt,
  getShipperAll,
  getDepartmentAll,
  getUsersAll,
  postCreateUser,
  getUserProfileImage,
  postAddUserToDepartment,
  postUpdateUser,
  removeUserToDepartment,
  getBolAll,
  getSearchByDr,
  postCreateDockReceipt,
  postAddCostDept,
  postAddCost,
  putUpdateCostDr,
  deleteCostDr,
  putUpdateCostDept,
  deleteCostDept,
  getCostTypesAll,
  getGlCodeCostAll,
  getDeptAll,
  getCostByDockReceipt,
  getFilesByDockReceipt,
  getFilesByBol,
  postUploadFileDockReceipt,
  postUploadFileBol,
  postUploadFileAvatar,
  putUpdateDockReceipt,
  getApproveDockReceipt,
  getForApprovalDockReceipt,
  postRejectDockReceipt,
  getAssignDockReceipt,
  putEditDrBolPage,
  getComments,
  getShippers,
  putUpdateCostType,
  postCreateCostType,
  getGlCodeCosts,
  getBols,
  postCreateBol,
  putUpdateBol,
  postAddCostBol,
  getCostTypesBolAll,
  deleteBolCost,
  putUpdateBolCost,
  getDrStatus,
  postNewDrMessage,
  postAddDepartment,
  putUpdateDepartment,
  deleteDepartment,
  postAddShipper,
  putUpdateShipper,
  deleteShipper,
  postAddCostTypeBol,
  putUpdateCostTypeBol,
  deleteCostTypeBol,
  postAddGlCodeCosts,
  putUpdateGlCodeCosts,
  deleteGlCodeCosts,
  putAssignDockReceipt,
  postSendEmail,
  getAllRoles,
  postForceNotifyBuyerEmail,
  getNotifications,
  getMarkAsReadNotification,
  getMarkAsReaAllNotification,
  getAudits,
  postResetPassword,
  deleteFile
};
export default iAxios;
