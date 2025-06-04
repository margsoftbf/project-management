interface UserInfoResponse {
  slug: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  role: 'admin' | 'landlord' | 'tenant';
  address: string | null;
  city: string | null;
  postalCode: string | null;
  emailVerified: boolean;
  privacyConsent: boolean;
  marketingConsent: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginResponse {
  access_token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export class PropertyApi {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  static async getUserInfo(token: string): Promise<UserInfoResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/userinfo`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  }

  static async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    privacyConsent: boolean;
    marketingConsent: boolean;
  }): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  }
}
