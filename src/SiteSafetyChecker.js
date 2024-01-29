import React, { useState } from 'react';
import axios from 'axios';

const SiteSafetyChecker = () => {
  const [domain, setDomain] = useState('');
  const [safetyStatus, setSafetyStatus] = useState('');

  const checkSiteSafety = async () => {
    try {
      const response = await axios.get(`https://lookup.phishfort.com/api/lookup?domain=${domain}`);
      const siteStatus = response.data;

      if (siteStatus.safe) {
        setSafetyStatus('Безопасный сайт');
      } else {
        setSafetyStatus('Небезопасный сайт');
      }
    } catch (error) {
      console.error('Произошла ошибка при проверке безопасности сайта:', error.message);
      setSafetyStatus('Ошибка при проверке безопасности сайта');
    }
  };

  return (
    <div>
      <label>
        Введите домен для проверки безопасности:
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
      </label>
      <button onClick={checkSiteSafety}>Проверить</button>
      <div style={{ color: safetyStatus === 'Безопасный сайт' ? 'green' : 'red' }}>
        {safetyStatus}
      </div>
    </div>
  );
};

export default SiteSafetyChecker;

