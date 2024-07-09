using MediatR;
using awqaf.Dto;
using System.Security.Claims;

namespace awqaf.Application.Commands
{
    public class AccountSaveCommand : IRequest<Unit>
    {
        public ClaimsPrincipal User { get; set; }
        public UserDto UserDto { get; set; }
    }
}
