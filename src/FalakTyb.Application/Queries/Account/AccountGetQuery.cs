using MediatR;
using awqaf.Dto;

namespace awqaf.Application.Commands
{
    public class AccountGetQuery : IRequest<UserDto>
    {
    }
}
