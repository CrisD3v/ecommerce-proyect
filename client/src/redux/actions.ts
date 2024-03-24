// actions.ts
export const CLICK_ACTION = "CLICK_ACTION";

export interface ClickAction {
  type: typeof CLICK_ACTION;
}

export const clickAction = (): ClickAction => {
  return {
    type: CLICK_ACTION,
  };
};
