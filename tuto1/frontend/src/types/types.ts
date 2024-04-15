export interface BaseOption {
    onSuccess?: (data?: any) => void;
    onError?: (data?: any) => void;
  }
  export interface User extends BaseOption {
    email: string;
    password: string;
  }
  export interface Props {
    item: User[];
    isLoading: boolean;
    error: Error | null;
  }
  export const initialState: Props = {
    item: [],
    isLoading: false,
    error: null,
  };

  export interface GetMenu extends BaseOption{
    name: string
    price: number
  }