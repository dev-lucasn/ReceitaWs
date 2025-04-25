import { useState } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { CompanyForm } from '@/features/company/components/CompanyForm';
import { CompanyTable } from '@/features/company/components/CompanyTable';
import { useCompanies } from '@/features/company/hooks/useCompanies';
import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/router';
import { Company } from '@/features/company/companyTypes';
import { CompanyEditModal } from "@/features/company/components/CompanyEditModal"

export default function EmpresasPage() {
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const { data, loading, refresh } = useCompanies();
  const router = useRouter();

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
  };

  return (
    <MainLayout>
      <Box p={8}>
        <Heading mb={6}>Cadastro de Empresas</Heading>

        <CompanyForm onSuccess={refresh} />

        <VStack mt={8} spacing={4} align="stretch">
          <CompanyTable
            data={data}
            loading={loading}
            onRefresh={refresh}
            onEdit={handleEdit}
          />

          <CompanyEditModal
            isOpen={!!editingCompany}
            onClose={() => setEditingCompany(null)}
            company={editingCompany}
            onSuccess={refresh}
          />
        </VStack>
      </Box>
    </MainLayout>
  );
}
