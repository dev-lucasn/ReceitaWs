using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReceitaWs.Application.DTOs;
using ReceitaWs.Application.Interfaces;

namespace ReceitaWs.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<IActionResult> Register(string cnpj)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Unauthorized("Usuário não autenticado");

            var result = await _companyService.RegisterCompanyAsync(userId, cnpj);
            return result.Success ? Ok(result.Message) : BadRequest(result.Message);
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllCompany()
        {
            var result = await _companyService.GetAllCompanyAsync();

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new
            {
                companys = result.Data,
                message = result.Message
            });
        }

        [HttpPut("update/{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCompanyDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Unauthorized("Usuário não autenticado");

            var result = await _companyService.UpdateCompanyAsync(id, userId, dto);
            return result.Success ? Ok(result.Message) : BadRequest(result.Message);
        }

        [HttpDelete("delete/{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Unauthorized("Usuário não autenticado");

            var result = await _companyService.DeleteCompanyAsync(id, userId);
            return result.Success ? Ok(result.Message) : BadRequest(result.Message);
        }
    }
}