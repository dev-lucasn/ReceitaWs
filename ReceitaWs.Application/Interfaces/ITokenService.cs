using ReceitaWs.Core.Entities;

namespace ReceitaWs.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
