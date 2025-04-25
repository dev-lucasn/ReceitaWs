import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { registerCompany } from '../services/companyService';

interface Props {
  onSuccess: () => void;
}

export const CompanyForm = ({ onSuccess }: Props) => {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    if (!cnpj) return;

    setLoading(true);
    try {
      await registerCompany(cnpj);
      toast({
        title: 'Empresa registrada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setCnpj('');
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Erro ao registrar empresa',
        description: error?.response?.data || 'Erro inesperado.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = () => {
    onSuccess(); 
  };

  return (
    <Box mb={6}>
      <FormControl>
        <FormLabel>CNPJ</FormLabel>
        <Input
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
        />
      </FormControl>

      <VStack align="start" spacing={3} mt={4}>
        <Button colorScheme="green" onClick={handleRegister} isLoading={loading}>
          Registrar CNPJ
        </Button>
        <Button onClick={handleBuscar}>Buscar</Button>
      </VStack>
    </Box>
  );
};
