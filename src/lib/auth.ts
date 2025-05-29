// src/lib/auth.ts
export const getUserRole = (): 'admin' | 'user' | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed.role === 'admin' ? 'admin' : 'user';
  } catch {
    return null;
  }
};
