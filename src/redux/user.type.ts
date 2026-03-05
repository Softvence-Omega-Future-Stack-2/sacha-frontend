export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: "tenant" | "owner" | string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  user: {
    user: {
      id: number;
      email: string;
    };
    profile: {
      first_name: string;
      last_name: string;
      phone_number: string;
      role: string;
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
  error: boolean;
};
