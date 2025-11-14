import { useState, useEffect } from 'react';

export default function PreviewPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Basit sabit şifre
  const correctPassword = 'dsg2025';

  const showContent = () => {
    const content = document.getElementById('preview-content');
    const passwordForm = document.getElementById('preview-password-form');
    if (content) {
      content.classList.remove('hidden');
    }
    if (passwordForm) {
      passwordForm.classList.add('hidden');
    }
  };

  useEffect(() => {
    // Development modunda (localhost) şifre kontrolünü bypass et
    const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.includes('localhost');
    
    if (isDevelopment) {
      // Local'de direkt içeriği göster
      setIsAuthenticated(true);
      showContent();
      setIsChecking(false);
      return;
    }
    
    // Production'da şifre kontrolü
    const savedPassword = localStorage.getItem('preview_password');
    const savedTime = localStorage.getItem('preview_password_time');
    
    // Şifre 24 saat geçerli
    const isValid = savedPassword === correctPassword && 
                    savedTime && 
                    (Date.now() - parseInt(savedTime)) < 24 * 60 * 60 * 1000;
    
    if (isValid) {
      setIsAuthenticated(true);
      showContent();
    } else {
      // Eski şifreyi temizle
      if (savedPassword) {
        localStorage.removeItem('preview_password');
        localStorage.removeItem('preview_password_time');
      }
    }
    setIsChecking(false);
  }, [correctPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === correctPassword) {
      // Şifreyi localStorage'a kaydet (24 saat geçerli)
      localStorage.setItem('preview_password', password);
      localStorage.setItem('preview_password_time', Date.now().toString());
      setIsAuthenticated(true);
      showContent();
    } else {
      setError('Yanlış şifre! Lütfen tekrar deneyin.');
      setPassword('');
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // İçerik zaten gösteriliyor
  }

  return (
    <div id="preview-password-form" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Önizleme Sayfası</h1>
          <p className="text-gray-600">Bu sayfaya erişmek için şifre gereklidir.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Şifrenizi girin"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-urgent text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Normal blog sayfası için{' '}
            <a href="/blog" className="text-primary hover:underline font-semibold">
              buraya tıklayın
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

