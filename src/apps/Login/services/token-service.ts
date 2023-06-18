export interface TokenPair {
  accessToken?: string;
  refreshToken?: string;
}

export interface TokensState {
  tokens?: TokenPair;
}
export interface SaveTokenPair {
  success: boolean;
  message: string;
}
export function getTokensFromLocalStorage(): TokensState {
  if (typeof window !== 'undefined' && window.localStorage) {
    const accessToken = localStorage?.getItem("accessToken") || "";
    const refreshToken = localStorage?.getItem("refreshToken") || "";
    return {
      tokens: {
        accessToken: accessToken || "",
        refreshToken: refreshToken || "",
      },
    };
  }
  return {
    tokens: {
      accessToken: "",
      refreshToken: "",
    },
  };
}

export function saveTokensToLocalStorage(tokens: TokenPair): SaveTokenPair {
  if (!tokens.accessToken || !tokens.refreshToken) {
    return {
      success: false,
      message:
        "Los tokens de acceso y de actualización son necesarios para guardar en localStorage",
    };
  }

  try {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  } catch (error: any) {
    return {
      success: false,
      message: `Error al guardar los tokens en localStorage: ${error.message}`,
    };
  }

  return {
    success: true,
    message: "Tokens guardados correctamente en localStorage",
  };
}
