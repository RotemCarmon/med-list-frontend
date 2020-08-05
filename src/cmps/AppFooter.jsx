import React from "react";
import { useTranslation } from 'react-i18next';

const AppFooter = () => {
  const { t } = useTranslation('translations');
  return (
    <div className="app-footer-container text-center">
      <div className="rights">
        <p>&nbsp; {t('footer.rights')}</p>
        <p>{t('footer.address')}</p>
      </div>

      <h5>Created by Rotem Carmon</h5>
    </div>
  );
};

export default AppFooter;
