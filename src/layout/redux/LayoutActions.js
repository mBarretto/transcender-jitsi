export const SIDEBAR_LEFT = 'SIDEBAR_LEFT'
export const setSidebarLeft = e => ({
  type: SIDEBAR_LEFT,
  payload: e
})

export const SIDEBAR_RIGHT = 'SIDEBAR_RIGHT'
export const setSidebarRigth = e => ({
  type: SIDEBAR_RIGHT,
  payload: e
})

export const MODAL_OPEN = 'MODAL_OPEN'
export const modalOpen = e => ({
  type: MODAL_OPEN,
  payload: e
})
