import { useState, useEffect } from 'react';
import { Company } from '../companyTypes';
import { getAllCompanies } from '../services/companyService';

export function useCompanies() {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllCompanies();
      setData(res.data.companys);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, refresh: fetch };
}