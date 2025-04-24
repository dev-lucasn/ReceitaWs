using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReceitaWs.Application.DTOs;
using ReceitaWs.Application.Interfaces;
using ReceitaWs.Core.Entities;

namespace ReceitaWs.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] LoginRequestDto model)
        {
            var user = await _userService.AuthenticateAsync(model.Username, model.Password);

            if (user == null)
                return Unauthorized(new { message = "Usuário ou senha inválidos" });

            var token = _tokenService.GenerateToken(user);

            return Ok(new
            {
                user = new { user.Id, user.Username, user.Role },
                token = token
            });
        }

        [HttpPost("register")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            var result = await _userService.RegisterUserAsync(dto);
            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return CreatedAtAction(nameof(Authenticate), new { dto.Username }, new { message = "Usuário criado com sucesso" });
        }

        [HttpPut("Update")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto dto)
        {
            var result = await _userService.UpdateUserAsync(id, dto);
            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new { message = "Usuário atualizado com sucesso" });
        }
        
        [HttpGet("GetAll")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userService.GetAllUsersAsync();

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new
            {
                users = result.Data,
                message = result.Message
            });
        }
        
        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new
            {
                message = result.Message   
            });
        }
    }
}
