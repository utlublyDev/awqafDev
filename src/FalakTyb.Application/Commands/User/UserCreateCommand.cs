using awqaf.Domain;
using MediatR;
using awqaf.Dto;

namespace awqaf.Application.Commands
{
    public class UserCreateCommand : IRequest<User>
    {
        public UserDto UserDto { get; set; }
    }
}
