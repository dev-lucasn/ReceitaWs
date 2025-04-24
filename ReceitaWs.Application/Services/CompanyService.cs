using System.Text.Json;
using ReceitaWs.Application.DTOs;
using ReceitaWs.Application.Interfaces;
using ReceitaWs.Core.Entities;
using ReceitaWs.Core.Interfaces;

namespace ReceitaWs.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _repository;
        private readonly HttpClient _httpClient;

        public CompanyService(ICompanyRepository repository, HttpClient httpClient)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task<(bool Success, string Message)> RegisterCompanyAsync(string userId, string cnpj)
        {
            if (string.IsNullOrWhiteSpace(cnpj))
                return (false, "CNPJ inválido");

            var response = await _httpClient.GetAsync($"https://www.receitaws.com.br/v1/cnpj/{cnpj}");
            if (!response.IsSuccessStatusCode)
                return (false, "Erro ao consultar a ReceitaWS");

            var json = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<JsonElement>(json);

            if (data.GetProperty("status").GetString() != "OK")
                return (false, "CNPJ não encontrado");

            var company = new Company
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Cnpj = cnpj,
                CorporateName = data.GetProperty("nome").GetString() ?? string.Empty,
                TradeName = data.GetProperty("fantasia").GetString() ?? string.Empty,
                Status = data.GetProperty("situacao").GetString() ?? string.Empty,
                OpeningDate = data.GetProperty("abertura").GetString() ?? string.Empty,
                Type = data.GetProperty("tipo").GetString() ?? string.Empty,
                LegalNature = data.GetProperty("natureza_juridica").GetString() ?? string.Empty,
                MainActivity = data.GetProperty("atividade_principal")[0].GetProperty("text").GetString() ?? string.Empty,
                Street = data.GetProperty("logradouro").GetString() ?? string.Empty,
                Number = data.GetProperty("numero").GetString() ?? string.Empty,
                Complement = data.GetProperty("complemento").GetString() ?? string.Empty,
                Neighborhood = data.GetProperty("bairro").GetString() ?? string.Empty,
                City = data.GetProperty("municipio").GetString() ?? string.Empty,
                State = data.GetProperty("uf").GetString() ?? string.Empty,
                ZipCode = data.GetProperty("cep").GetString() ?? string.Empty
            };

            await _repository.AddAsync(company);
            return (true, "Empresa registrada com sucesso");
        }

        public async Task<(bool Success, string Message, IEnumerable<CompanyDto> Data)> GetAllCompanyAsync()
        {
            var companies = await _repository.GetAllAsync();

            var data = companies.Select(c => new CompanyDto
            {
                Id = c.Id,
                Cnpj = c.Cnpj,
                CorporateName = c.CorporateName,
                TradeName = c.TradeName,
                Status = c.Status,
                OpeningDate = c.OpeningDate,
                Type = c.Type,
                LegalNature = c.LegalNature,
                MainActivity = c.MainActivity,
                Address = $"{c.Street}, {c.Number} - {c.Neighborhood}, {c.City}/{c.State} - {c.ZipCode}"
            });
            return (true, "Empresas listadas com sucesso", data);
        }

        public async Task<(bool Success, string Message)> UpdateCompanyAsync(Guid id, string userId, UpdateCompanyDto dto)
        {
            var company = await _repository.GetByIdAsync(id);
            if (company == null || company.UserId != userId)
                return (false, "Empresa não encontrada");

            if (!string.IsNullOrWhiteSpace(dto.TradeName))
                company.TradeName = dto.TradeName;

            if (!string.IsNullOrWhiteSpace(dto.Status))
                company.Status = dto.Status;

            if (!string.IsNullOrWhiteSpace(dto.MainActivity))
                company.MainActivity = dto.MainActivity;

            if (!string.IsNullOrWhiteSpace(dto.Street))
                company.Street = dto.Street;

            if (!string.IsNullOrWhiteSpace(dto.Number))
                company.Number = dto.Number;

            if (!string.IsNullOrWhiteSpace(dto.Complement))
                company.Complement = dto.Complement;

            if (!string.IsNullOrWhiteSpace(dto.Neighborhood))
                company.Neighborhood = dto.Neighborhood;

            if (!string.IsNullOrWhiteSpace(dto.City))
                company.City = dto.City;

            if (!string.IsNullOrWhiteSpace(dto.State))
                company.State = dto.State;

            if (!string.IsNullOrWhiteSpace(dto.ZipCode))
                company.ZipCode = dto.ZipCode;
            
            await _repository.UpdateAsync(company);
            return (true, "Empresa atualizada com sucesso");
        }
        public async Task<(bool Success, string Message)> DeleteCompanyAsync(Guid id, string userId)
        {
            var company = await _repository.GetByIdAsync(id);
            if (company == null || company.UserId != userId)
                return (false, "Empresa não encontrada ou não autorizada");

            await _repository.DeleteAsync(company);
            return (true, "Empresa excluída com sucesso");
        }
    }
}