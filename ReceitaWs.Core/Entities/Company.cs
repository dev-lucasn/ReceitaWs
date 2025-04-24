namespace ReceitaWs.Core.Entities
{
    public class Company
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = null!;
        public string Cnpj { get; set; } = null!;
        public string CorporateName { get; set; } = null!;
        public string TradeName { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string OpeningDate { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string LegalNature { get; set; } = null!;
        public string MainActivity { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Number { get; set; } = null!;
        public string Complement { get; set; } = null!;
        public string Neighborhood { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string ZipCode { get; set; } = null!;
    }
}
