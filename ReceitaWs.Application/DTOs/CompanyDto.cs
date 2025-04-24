namespace ReceitaWs.Application.DTOs
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public string Cnpj { get; set; }
        public string CorporateName { get; set; }
        public string TradeName { get; set; }
        public string Status { get; set; }
        public string OpeningDate { get; set; }
        public string Type { get; set; }
        public string LegalNature { get; set; }
        public string MainActivity { get; set; }
        public string Address { get; set; }
    }
}