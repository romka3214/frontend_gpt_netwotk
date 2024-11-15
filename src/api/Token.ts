const tokenStorageIndex = "user_access_token";
const refreshTokenStorageIndex = "user_refresh_token";
const tokenExpiresStorageIndex = "user_token_expires";

class Token {
  private token!: string;
  private refreshToken!: string;
  private expires!: Date;

  constructor(token?: string, refreshToken?: string, expires?: Date) {
    if (token && refreshToken && expires) {
      this.set(token, refreshToken, expires);
    } else {
      this.token = localStorage.getItem(tokenStorageIndex) || "";
      this.refreshToken = localStorage.getItem(refreshTokenStorageIndex) || "";
      this.expires = new Date(
        parseInt(localStorage.getItem(tokenExpiresStorageIndex) || "")
      );
    }
  }

  getToken(): string | null {
    return this.isTokenFresh() ? this.token : null;
  }
  getRefreshToken(): string | null {
    return this.isTokenFresh() ? this.refreshToken : null;
  }
  getExpireTime(): Date {
    return this.expires;
  }

  set(token: string, refreshToken: string, expires: Date) {
    this.token = token;
    localStorage.setItem(tokenStorageIndex, this.token);

    this.refreshToken = refreshToken;
    localStorage.setItem(refreshTokenStorageIndex, this.refreshToken);

    this.expires = expires;
    localStorage.setItem(
      tokenExpiresStorageIndex,
      String(this.expires.getTime())
    );
  }

  remove() {
    localStorage.removeItem(tokenStorageIndex);
    localStorage.removeItem(refreshTokenStorageIndex);
    localStorage.removeItem(tokenExpiresStorageIndex);
  }

  isTokenFresh(): boolean {
    return (
      this.token.length > 0 && this.expires.getTime() > new Date().getTime()
    );
  }
}

export default Token;
